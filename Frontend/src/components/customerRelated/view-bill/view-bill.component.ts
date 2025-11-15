import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BillService } from '../../services/bill.service';

interface Bill {
  consumerNo?: string;
  billId: string;
  paymentStatus?: string;
  connectionType?: string;
  connectionStatus?: string;
  mobileNumber?: string;
  generatedAt?: Date;
  billingMonth: Date;
  dueDate: Date;
  disconnectionDate?: Date;
  dueAmount?: number;
  payableAmount: number;
  selected?: boolean;
}

@Component({
  selector: 'app-view-bill',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css']
})
export class ViewBillComponent implements OnInit {
  bills: Bill[] = [];
  filtered: Bill[] = [];
  searchTerm = '';
  totalAmount = 0;
  loading = false;
  errorMessage = '';

  private readonly rawUserId = localStorage.getItem('userId') ?? '';
  private readonly consumerNumber = this.parseConsumerNumber(this.rawUserId);
  // --- Helpers ---
  private parseConsumerNumber(userId: string): string {
    // If your userId is "u-<number>", remove the first 2 chars ("u-")
    if (!userId) return '';
    return userId.startsWith('u-') ? userId.slice(2) : userId;
  }

  constructor(private router: Router, private billService: BillService) {}

  ngOnInit(): void {
    this.fetchAllMyBills();
  }


  private mapBill(b: any): Bill {
  return {
    billId: String(b.billId ?? 'N/A'),   // 👈 force string
    generatedAt: b.generatedAt?new Date(b.generatedAt) :undefined,
    billingMonth: new Date(b.billingMonth),
    dueDate: new Date(b.dueDate),
    disconnectionDate: b.disconnectionDate ? new Date(b.disconnectionDate) : undefined,
    paymentStatus: b.status ?? 'N/A',
    connectionType: b.connectionType ?? '',
    connectionStatus: b.connectionStatus ?? '',
    mobileNumber: b.mobileNumber ?? '',
    dueAmount: b.amount ?? 0,
    payableAmount: b.amount ?? 0,
    selected: false,
    consumerNo: this.consumerNumber
  };
}


  // --- Data loading ---
  fetchAllMyBills(): void {
    this.loading = true;
    this.errorMessage = '';
    this.billService.getAllBillsForCurrentUser().subscribe({
      next: (data) => {
        const mapped = (data ?? []).map(x => this.mapBill(x));
        this.bills = mapped;
        this.filtered = mapped.slice(); // show all initially
        this.updateTotal();
        this.loading = false;
        console.log(data)
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.message || 'Failed to load bills. Please try again.';
        this.bills = [];
        this.filtered = [];
        this.updateTotal();
      }
    });
  } 
  getDisconnectionDate(dueDate: string | Date): Date {
  const date = new Date(dueDate);
  date.setDate(date.getDate() + 15); // add 15 days
  return date;
}


  // --- Search (manual) ---
  // No-op kept only for compatibility if referenced elsewhere
  applyFilter(): void {}

  searchBills(): void {
  const term = (this.searchTerm || '').trim().toLowerCase();

  if (!term) {
    this.filtered = this.bills.slice();
    this.updateTotal();
    return;
  }

  // 👇 Always compare lowercase strings
  this.filtered = this.bills.filter(b => String(b.billId).toLowerCase() === term);

  // If you prefer partial match, use:
  // this.filtered = this.bills.filter(b => String(b.billId).toLowerCase().includes(term));

  this.updateTotal();
}


  clearSearch(): void {
    this.searchTerm = '';
    this.filtered = this.bills.slice();
    this.updateTotal();
  }

  // --- Totals / Navigation ---
  updateTotal(): void {
    this.totalAmount = this.bills
      .filter(b => b.selected)
      .reduce((sum, b) => sum + (Number(b.payableAmount) || 0), 0);
  }

  get hasSelected(): boolean {
  return this.bills.some(b => !!b.selected);
}

  proceedToSummary(): void {
    const selectedBills = this.bills.filter(b => b.selected);
    console.log('Selected bills for summary:', selectedBills);
    if (!selectedBills.length) {
      alert('Please select at least one bill to proceed.');
      return;
    }
    localStorage.setItem('selectedBills', JSON.stringify(selectedBills));
    this.router.navigate(['/customer/bill-summary'], {
      state: { selectedBills:selectedBills, totalAmount: this.totalAmount }
    });
  }

  
}
