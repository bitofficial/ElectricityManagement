import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface Bill {
  consumerNo: string;
  billNumber: string;
  paymentStatus: string;
  connectionType: string;
  connectionStatus: string;
  mobileNumber: string;
  billPeriod: string;
  billDate: Date;
  dueDate: Date;
  disconnectionDate: Date;
  dueAmount: number;
  payableAmount: number;
  selected?: boolean;
}

@Component({
  selector: 'app-view-bill',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css']
})
export class ViewBillComponent {
  customerId: string = '';
  billId: string = '';
  bills: Bill[] = [];
  totalAmount: number = 0;
  errorMessage: string = '';

  // Simulated backend call
  getBills() {
    if (!this.customerId.trim()) {
      this.errorMessage = 'Please enter a valid Customer ID.';
      this.bills = [];
      return;
    }

    this.errorMessage = '';

    // Sample mock bills (in real app, fetch from backend API)
    this.bills = [
      {
        consumerNo: this.customerId,
        billNumber: 'BILL001',
        paymentStatus: 'Unpaid',
        connectionType: 'Domestic',
        connectionStatus: 'Connected',
        mobileNumber: '9876543210',
        billPeriod: 'Oct 2025',
        billDate: new Date('2025-10-01'),
        dueDate: new Date('2025-10-20'),
        disconnectionDate: new Date('2025-10-30'),
        dueAmount: 1200,
        payableAmount: 1200
      },
      {
        consumerNo: this.customerId,
        billNumber: 'BILL002',
        paymentStatus: 'Unpaid',
        connectionType: 'Commercial',
        connectionStatus: 'Connected',
        mobileNumber: '9876543210',
        billPeriod: 'Nov 2025',
        billDate: new Date('2025-11-01'),
        dueDate: new Date('2025-11-20'),
        disconnectionDate: new Date('2025-11-30'),
        dueAmount: 1800,
        payableAmount: 1800
      }
    ];

    this.updateTotal();
  }

  updateTotal() {
    this.totalAmount = this.bills
      .filter(bill => bill.selected)
      .reduce((sum, bill) => sum + (bill.payableAmount || 0), 0);
  }

  proceedToPay() {
    const selectedBills = this.bills.filter(b => b.selected);
    if (selectedBills.length === 0) {
      alert('Please select at least one bill to proceed.');
      return;
    }

    // Navigate to payment screen or process payment
    alert(
      `Proceeding to payment for ${selectedBills.length} bill(s). Total: ₹${this.totalAmount.toFixed(2)}`
    );
  }
}
