import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillHistoryService, BackendBill } from '../../services/bill-history.service'; // adjust path as needed
import { finalize } from 'rxjs/operators';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type PaymentStatus = 'PAID' | 'UNPAID' | 'PARTIAL';

interface BillHistory {
  id: string;
  consumerNumber: string;
  billDate: string;         // ISO string or yyyy-mm-dd
  billingPeriod: string;    // e.g. "Oct 2025" or original string
  dueDate: string;          // ISO string
  billAmount: number;       // numeric
  paymentStatus: PaymentStatus;
  paymentDate?: string;     // ISO string when paid/partial
  modeOfPayment?: string;   // e.g. "Credit Card", "Net Banking"
  pdfUrl?: string;          // link to full bill (download/view)
}

@Component({
  selector: 'app-bill-history',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './bill-history.component.html',
  styleUrls: ['./bill-history.component.css']
})
export class BillHistoryComponent implements OnInit {
  bills: BillHistory[] = [];
  filtered: BillHistory[] = [];
  loading = false;
  error = '';
  fromDate: string = '';
  toDate: string = '';

  statusFilter: 'ALL' | PaymentStatus = 'ALL';
  sortColumn: '' | 'billDate' | 'dueDate' | 'billAmount' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Simulated auth (replace with your AuthService)
  isAuthenticated = true;

  // If you have a real auth, replace this hard-coded id with actual customer id
    private readonly rawUserId = localStorage.getItem('userId') ?? '';
  private readonly customerId = this.parseConsumerNumber(this.rawUserId);
  // --- Helpers ---
  private parseConsumerNumber(userId: string): string {
    // If your userId is "u-<number>", remove the first 2 chars ("u-")
    if (!userId) return '';
    return userId.startsWith('u-') ? userId.slice(2) : userId;
  }

  constructor(
    private router: Router,
    private location: Location,
    private billService: BillHistoryService
  ) {}

  ngOnInit(): void {
    if (!this.isAuthenticated) {
      this.error = 'You must be signed in to view your bill history.';
      return;
    }
    const { from, to } = this.defaultSixMonthRange();
    this.fromDate = from;
    this.toDate = to;
    this.loadBills();
  }

  private defaultSixMonthRange(): { from: string; to: string } {
    const to = new Date();
    const from = new Date(to.getFullYear(), to.getMonth() - 5, 1);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    return { from: fmt(from), to: fmt(to) };
  }

  /**
   * Map backend status to PaymentStatus enum
   */
  private mapStatus(s: string | undefined): PaymentStatus {
    if (!s) return 'UNPAID';
    const key = s.trim().toLowerCase();
    if (key === 'paid') return 'PAID';
    if (key === 'partial' || key === 'partially paid' || key === 'partialpaid') return 'PARTIAL';
    return 'UNPAID';
  }
  private parseBillingMonth(billingMonth: string | undefined): { billDate: string; billingPeriod: string } {
    if (!billingMonth) {
      const d = new Date();
      return { billDate: d.toISOString().slice(0,10), billingPeriod: '' };
    }
    // Accept formats like "OCT-2025", "OCT-2025", "Oct-2025", "2025-10"
    const s = billingMonth.trim();
    // try "MON-YYYY"
    const monYearMatch = s.match(/^([A-Za-z]{3,})-?(\d{4})$/);
    if (monYearMatch) {
      const monStr = monYearMatch[1].slice(0,3);
      const year = Number(monYearMatch[2]);
      const monthIndex = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
        .indexOf(monStr.toLowerCase());
      if (monthIndex >= 0) {
        const date = new Date(year, monthIndex, 1);
        const billDate = date.toISOString().slice(0,10);
        const billingPeriod = date.toLocaleString(undefined, { month: 'short', year: 'numeric' });
        return { billDate, billingPeriod };
      }
    }
    // try "YYYY-MM" or "YYYY-MM-DD"
    const ymd = new Date(s);
    if (!isNaN(ymd.getTime())) {
      const billDate = new Date(ymd.getFullYear(), ymd.getMonth(), 1).toISOString().slice(0,10);
      const billingPeriod = ymd.toLocaleString(undefined, { month: 'short', year: 'numeric' });
      return { billDate, billingPeriod };
    }

    // fallback
    return { billDate: new Date().toISOString().slice(0,10), billingPeriod: s };
  }

  loadBills(): void {
    this.loading = true;
    this.error = '';
    this.bills = [];
    this.filtered = [];

    // Use the service to fetch backend bills
    this.billService.getBillHistory(this.customerId)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (backend: BackendBill[]) => {
          // console.log(backend)
          // Map backend array into our BillHistory[] shape
          const mapped: BillHistory[] = backend.map(b => {
            const { billDate, billingPeriod } = this.parseBillingMonth(b.billingMonth);
            // Use backend dueDate as ISO string (if it's already yyyy-mm-dd it's fine)
            const dueDateIso = b.dueDate ? new Date(b.dueDate).toISOString().slice(0,10) : '';
            // Construct a pdfUrl if your API provides one; otherwise leave undefined or point to a route
            const pdfUrl = `/api/dashboard/bill/${b.billId}/pdf`; // adjust if your backend has endpoint
            return {
              id: String(b.billId),
              consumerNumber: `${this.customerId.toString().padStart(4, '0')}`, // or get from backend if available
              billDate,
              billingPeriod,
              dueDate: dueDateIso,
              billAmount: Number(b.amount ?? 0),
              paymentStatus: this.mapStatus(b.status),
              // backend doesn't send paymentDate/modeOfPayment in given sample; leave undefined
              pdfUrl
            } as BillHistory;
          });

          // assign and apply filters / sort
          this.bills = mapped;
          this.applyFiltersAndSort();
          console.log(this.bills);
        },
        error: (err) => {
          console.error('Failed to load bills', err);
          this.error = 'Failed to load billing history. Please try again later.';
        }
      });
  }

  applyFiltersAndSort(): void {
    let out = this.bills.slice();

    if (this.fromDate) {
      const from = new Date(this.fromDate);
      out = out.filter(b => new Date(b.billDate) >= from);
    }
    if (this.toDate) {
      const to = new Date(this.toDate);
      to.setHours(23, 59, 59, 999);
      out = out.filter(b => new Date(b.billDate) <= to);
    }

    if (this.statusFilter !== 'ALL') {
      out = out.filter(b => b.paymentStatus === this.statusFilter);
    }

    if (this.sortColumn) {
      const col = this.sortColumn;
      out.sort((a, b) => {
        const cmp = this.compareByColumn(a, b, col);
        return this.sortDirection === 'asc' ? cmp : -cmp;
      });
    } else {
      out.sort((a, b) => new Date(b.billDate).getTime() - new Date(a.billDate).getTime());
    }

    this.filtered = out;
  }

  private compareByColumn(a: BillHistory, b: BillHistory, col: 'billDate' | 'dueDate' | 'billAmount'): number {
    if (col === 'billAmount') {
      const av = Number(a.billAmount);
      const bv = Number(b.billAmount);
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    } else {
      const av = new Date(a[col]).getTime();
      const bv = new Date(b[col]).getTime();
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    }
  }

  onFilterChange(): void { this.applyFiltersAndSort(); }

  toggleSort(column: 'billDate' | 'dueDate' | 'billAmount'): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSort();
  }

  viewOrDownload(bill: BillHistory): void {
    if (!bill.pdfUrl) {
      alert('Bill PDF not available for this record.');
      return;
    }
    window.open(bill.pdfUrl, '_blank');
  }

  formatCurrency(amount: number): string {
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  get visibleTotal(): number {
    const cents = this.filtered.reduce((acc, b) => acc + Math.round(b.billAmount * 100), 0);
    return cents / 100;
  }

  retry(): void {
    this.error = '';
    this.loadBills();
  }

  goBack(): void {
    this.location.back();
  }

  /**
   * Generate and download bill as PDF
   */
  printBillAsPDF(bill: BillHistory): void {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    let yPosition = margin;

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('ELECTRICITY BILL', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 12;

    // Bill Header Info
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const headerData = [
      ['Bill Number:', bill.id],
      ['Consumer Number:', bill.consumerNumber],
      ['Billing Period:', bill.billingPeriod],
      ['Bill Date:', bill.billDate],
      ['Due Date:', bill.dueDate],
      ['Bill Amount:', `₹ ${this.formatCurrency(bill.billAmount)}`],
      ['Payment Status:', bill.paymentStatus]
    ];

    headerData.forEach((row) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(row[0], margin, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(row[1], margin + 60, yPosition);
      yPosition += 7;
    });

    yPosition += 5;

    // Bill Details Table
    const tableData = [
      ['Item', 'Value'],
      ['Bill Number', bill.id],
      ['Consumer Number', bill.consumerNumber],
      ['Billing Period', bill.billingPeriod],
      ['Bill Date', bill.billDate],
      ['Due Date', bill.dueDate],
      ['Bill Amount', `₹ ${this.formatCurrency(bill.billAmount)}`],
      ['Payment Status', bill.paymentStatus]
    ];

    autoTable(doc, {
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: yPosition,
      margin: margin,
      theme: 'grid',
      headStyles: {
        fillColor: [14, 165, 164],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 12,
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 11,
        textColor: 50
      },
      alternateRowStyles: {
        fillColor: [240, 248, 248]
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { halign: 'right' }
      },
      didDrawPage: (data) => {
        // Footer
        const pageCount = (doc as any).internal.getNumberOfPages();
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }
    });

    // Generate filename
    const fileName = `Bill_${bill.id}_${bill.billingPeriod.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
  }
}
