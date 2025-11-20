import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BillService } from '../../services/bill.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-bill',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './add-bill.component.html',
  standalone: true,
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent {
  bill = {
    consumerNumber: '',
    billingMonth: '',
    unitsConsumed: 0,
    pricePerUnit: 0,
    dueDate: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  // Billing month limit
  minBillingMonth: string = '';
  maxBillingMonth: string = ''; // will not be used now

  // Due date based on next month
  dueDateMin: string = '';
  dueDateMax: string = '';

  constructor(private billService: BillService) {}

ngOnInit() {
  const today = new Date();

  // Minimum allowed: previous month
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  // Convert to YYYY-MM format
  this.minBillingMonth = prevMonth.toISOString().slice(0, 7);

  // No maximum restriction
  this.maxBillingMonth = "";
}


  onBillingMonthChange() {
    if (!this.bill.billingMonth) return;

    const [year, month] = this.bill.billingMonth.split('-').map(Number);

    // NEXT month calculation
    const dueYear = month === 12 ? year + 1 : year;
    const dueMonth = month === 12 ? 1 : month + 1;

    const firstDay = new Date(dueYear, dueMonth - 1, 1);
    const lastDay = new Date(dueYear, dueMonth, 0);

    this.dueDateMin = firstDay.toISOString().split('T')[0];
    this.dueDateMax = lastDay.toISOString().split('T')[0];

    // Reset due date if invalid
    if (this.bill.dueDate < this.dueDateMin || this.bill.dueDate > this.dueDateMax) {
      this.bill.dueDate = '';
    }
  }

  addBill(): void {
    this.billService.addBill(this.bill).subscribe({
      next: (response) => {
        this.successMessage = 'Bill added successfully!';
        this.errorMessage = '';

        this.bill = {
          consumerNumber: '',
          billingMonth: '',
          unitsConsumed: 0,
          pricePerUnit: 0,
          dueDate: ''
        };
        this.dueDateMin = '';
        this.dueDateMax= '';

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },

      error: (err) => {
        this.errorMessage = 'Failed to add bill. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
