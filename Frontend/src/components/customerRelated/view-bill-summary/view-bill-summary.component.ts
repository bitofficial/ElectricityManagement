import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Bill {
  id: string;
  consumerNumber: string;
  billDate: string;        // ISO or formatted string
  billingPeriod: string;   // e.g. "Mar 2025"
  billAmount: number;      // numeric amount
  dueDate: string;
  selected?: boolean;
}

@Component({
  selector: 'app-view-bill-summary',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './view-bill-summary.component.html',
  styleUrls: ['./view-bill-summary.component.css']
})
export class ViewBillSummaryComponent implements OnInit {
  bills: Bill[] = [];
  loading = false;
  error = '';
  paymentMethod: 'credit_card' | 'debit_card' | 'net_banking' | '' = '';
  proceedDisabledMsg = ''; // optional message shown when proceed disabled

  constructor(
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadBills();
  }

  // Simulated async loader — replace with real service call
  loadBills(): void {
    this.loading = true;
    this.error = '';
    this.bills = [];

    // Simulate network delay
    setTimeout(() => {
      // Simulate success or failure (set to false to test error UI)
      const simulateFailure = false;

      if (simulateFailure) {
        this.loading = false;
        this.error = 'Failed to load bills. Please retry or go back.';
      } else {
        // Example data - replace with API response mapping
        this.bills = [
          { id: 'b1', consumerNumber: 'C12345', billDate: '2025-10-01', billingPeriod: 'Sep 2025', billAmount: 120.50, dueDate: '2025-10-20', selected: false },
          { id: 'b2', consumerNumber: 'C12345', billDate: '2025-09-01', billingPeriod: 'Aug 2025', billAmount: 98.00, dueDate: '2025-09-20', selected: false },
          { id: 'b3', consumerNumber: 'C98765', billDate: '2025-10-05', billingPeriod: 'Sep 2025', billAmount: 45.75, dueDate: '2025-10-25', selected: false }
        ];
        this.loading = false;
      }
    }, 700);
  }

  // toggle called when checkbox clicked (two-way binding also keeps selected up-to-date)
  toggleSelection(bill: Bill): void {
    bill.selected = !bill.selected;
  }

  // compute total for selected bills
  get totalAmount(): number {
    // digit-by-digit-safe sum: sum as integer cents then divide to avoid floating issues
    const cents = this.bills
      .filter(b => b.selected)
      .reduce((acc, b) => acc + Math.round(b.billAmount * 100), 0);
    return cents / 100;
  }

  // whether any bills selected
  get anySelected(): boolean {
    return this.bills.some(b => b.selected);
  }

  // proceed to payment click
  proceedToPayment(): void {
    if (!this.anySelected) {
      this.proceedDisabledMsg = 'Please select at least one bill to proceed.';
      return;
    }
    if (!this.paymentMethod) {
      this.proceedDisabledMsg = 'Please choose a payment method.';
      return;
    }

    // Prepare payload for backend
    const payload = {
      bills: this.bills.filter(b => b.selected).map(b => ({
        id: b.id,
        consumerNumber: b.consumerNumber,
        billAmount: b.billAmount
      })),
      total: this.totalAmount,
      paymentMethod: this.paymentMethod
    };

    // TODO: replace with real payment flow / service call
    console.log('Proceeding to payment with payload:', payload);

    // Example: navigate to a payment page, pass state or query params
    this.router.navigate(['/payment'], { state: { payload } });
  }

  // deselect a row directly (used by a 'deselect' icon if provided)
  deselectBill(bill: Bill): void {
    bill.selected = false;
  }

  // go back
  goBack(): void {
    this.location.back();
  }

  // retry after error
  retry(): void {
    this.loadBills();
  }

  // helper to format currency
  formatCurrency(amount: number): string {
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
