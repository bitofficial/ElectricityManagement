import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

type PaymentStatus = 'PAID' | 'UNPAID' | 'PARTIAL';

interface BillHistory {
  id: string;
  consumerNumber: string;
  billDate: string;         // ISO string or yyyy-mm-dd
  billingPeriod: string;    // e.g. "Aug 2025"
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
  // Date range controls (yyyy-mm-dd)
  fromDate: string = '';
  toDate: string = '';

  // Filter & sort controls
  statusFilter: 'ALL' | PaymentStatus = 'ALL';
  // keep as union including empty string to represent "no explicit sort"
  sortColumn: '' | 'billDate' | 'dueDate' | 'billAmount' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Simulated auth (replace with your AuthService)
  isAuthenticated = true;

  constructor(private router: Router, private location: Location) {}

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

  loadBills(): void {
    this.loading = true;
    this.error = '';
    this.bills = [];
    this.filtered = [];

    setTimeout(() => {
      const simulateFailure = false;
      if (simulateFailure) {
        this.loading = false;
        this.error = 'Failed to load billing history. Please retry.';
        return;
      }

      const example: BillHistory[] = [
        {
          id: 'B1001',
          consumerNumber: 'C-0001',
          billDate: '2025-10-01',
          billingPeriod: 'Sep 2025',
          dueDate: '2025-10-20',
          billAmount: 120.5,
          paymentStatus: 'PAID',
          paymentDate: '2025-10-10',
          modeOfPayment: 'Net Banking',
          pdfUrl: '/assets/sample-bills/B1001.pdf'
        },
        {
          id: 'B1000',
          consumerNumber: 'C-0001',
          billDate: '2025-09-01',
          billingPeriod: 'Aug 2025',
          dueDate: '2025-09-20',
          billAmount: 98,
          paymentStatus: 'UNPAID',
          pdfUrl: '/assets/sample-bills/B1000.pdf'
        },
        {
          id: 'B0999',
          consumerNumber: 'C-0001',
          billDate: '2025-08-01',
          billingPeriod: 'Jul 2025',
          dueDate: '2025-08-20',
          billAmount: 75.75,
          paymentStatus: 'PARTIAL',
          paymentDate: '2025-08-18',
          modeOfPayment: 'Credit Card',
          pdfUrl: '/assets/sample-bills/B0999.pdf'
        }
      ];

      this.bills = example;
      this.applyFiltersAndSort();
      this.loading = false;
    }, 600);
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

    // If a sort column is set, use a type-safe comparator
    if (this.sortColumn) {
      const col = this.sortColumn; // typed as one of the three allowed values (not empty here)
      out.sort((a, b) => {
        const cmp = this.compareByColumn(a, b, col);
        return this.sortDirection === 'asc' ? cmp : -cmp;
      });
    } else {
      out.sort((a, b) => new Date(b.billDate).getTime() - new Date(a.billDate).getTime());
    }

    this.filtered = out;
  }

  // Compare two bills based on an explicitly-known column (type safe)
  private compareByColumn(a: BillHistory, b: BillHistory, col: 'billDate' | 'dueDate' | 'billAmount'): number {
    if (col === 'billAmount') {
      const av = Number(a.billAmount);
      const bv = Number(b.billAmount);
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    } else {
      // col is a date field
      const av = new Date(a[col]).getTime();
      const bv = new Date(b[col]).getTime();
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    }
  }

  onFilterChange(): void {
    this.applyFiltersAndSort();
  }

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
}
