import { Component, OnInit } from '@angular/core';
import { PayBillService } from '../../services/pay-bill.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface SelectedBill {
  billId: string;
  billPeriod?: string;
  billDate?: string | Date;
  dueDate?: string | Date;
  dueAmount?: number;
  payableAmount: number;
  [key: string]: any; // allow extra fields from your app
}

@Component({
  selector: 'app-pay-bill',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.css']
})
export class PayBillComponent implements OnInit {

  // Bills from localStorage
  selectedBills: SelectedBill[] = [];
  totalAmount = 0;

  // Consumer info (optional: derive from first bill or from storage)
  consumerId = localStorage.getItem('consumerId') || 'CUST1001';

  // Payment form model
  payment: {
    method: '' | 'UPI' | 'Card' | 'NetBanking';
    upiId: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
    bank?: string;
  } = {
    method: '',
    upiId: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  // UI state
  paymentSuccess = false;
  paymentError = '';
  transactionId = '';
  isSubmitting = false;

  constructor(private payBillService: PayBillService) {}

  ngOnInit(): void {
    this.loadSelectedBills();
  }

  // Load bills from localStorage and compute total
  loadSelectedBills(): void {
    try {
      const raw = localStorage.getItem('selectedBills') || '[]';
      this.selectedBills = JSON.parse(raw) as SelectedBill[];

      // Normalize numeric fields just in case
      this.selectedBills = this.selectedBills.map(b => ({
        ...b,
        payableAmount: Number(b.payableAmount) || 0
      }));

      console.log('Loaded selected bills:', this.selectedBills);

      this.totalAmount = this.selectedBills.reduce((sum, b) => sum + (b.payableAmount || 0), 0);
    } catch {
      this.selectedBills = [];
      this.totalAmount = 0;
    }
  }

  // Optional helper: remove one bill from list (and localStorage)
  removeBill(billId: string): void {
    this.selectedBills = this.selectedBills.filter(b => b.billId !== billId);
    localStorage.setItem('selectedBills', JSON.stringify(this.selectedBills));
    this.totalAmount = this.selectedBills.reduce((sum, b) => sum + (b.payableAmount || 0), 0);
  }

  // Simple validation depending on method
  private validatePaymentForm(): string | null {
    if (!this.payment.method) return 'Please select a payment method.';

    if (this.payment.method === 'UPI') {
      if (!this.payment.upiId || !/^[\w.\-]+@[\w.\-]+$/.test(this.payment.upiId)) {
        return 'Please enter a valid UPI ID (e.g., name@bank).';
      }
    }

    if (this.payment.method === 'Card') {
      const digitsOnly = this.payment.cardNumber.replace(/\s+/g, '');
      if (!/^\d{16}$/.test(digitsOnly)) return 'Card number must be 16 digits.';
      if (!/^\d{2}\/\d{2}$/.test(this.payment.expiry)) return 'Expiry must be in MM/YY format.';
      if (!/^\d{3,4}$/.test(this.payment.cvv)) return 'CVV must be 3 or 4 digits.';
    }

    // NetBanking could require bank selection (optional)
    if (this.payment.method === 'NetBanking' && !this.payment.bank) {
      return 'Please select your bank for NetBanking.';
    }

    if (this.selectedBills.length === 0) return 'No bills selected. Please select bills to pay.';

    if (this.totalAmount <= 0) return 'Total amount must be greater than zero.';

    return null;
  }

  makePayment(form?: NgForm): void {
    this.paymentSuccess = false;
    this.paymentError = '';

    const validationError = this.validatePaymentForm();
    if (validationError) {
      this.paymentError = validationError;
      return;
    }

    // Build request to backend using selected bills + total
    const paymentRequest = {
      consumerId: this.consumerId,
      bills: this.selectedBills.map(b => ({
        billId: b.billId,
        payableAmount: b.payableAmount,
        dueDate: b.dueDate,
        billDate: b.billDate,
        billPeriod: b.billPeriod
      })),
      totalAmount: this.totalAmount,
      method: this.payment.method,
      paymentDetails: {
        upiId: this.payment.method === 'UPI' ? this.payment.upiId : undefined,
        cardNumber: this.payment.method === 'Card' ? this.payment.cardNumber : undefined,
        expiry: this.payment.method === 'Card' ? this.payment.expiry : undefined,
        cvv: this.payment.method === 'Card' ? this.payment.cvv : undefined,
        bank: this.payment.method === 'NetBanking' ? this.payment.bank : undefined
      }
    };

    this.isSubmitting = true;

    this.payBillService.processPayment(paymentRequest).subscribe({
      next: (response) => {
        // Expecting { transactionId: string, status?: 'SUCCESS'|'FAILED', ... }
        this.transactionId = response?.transactionId || '';
        this.paymentSuccess = true;
        this.isSubmitting = false;

        // (Optional) clear paid bills from storage, or keep as per your flow
        // localStorage.removeItem('selectedBills');
      },
      error: (err) => {
        console.error('Payment failed:', err);
        this.paymentError = (err?.error?.message) || 'Payment failed. Please try again.';
        this.paymentSuccess = false;
        this.isSubmitting = false;
      }
    });
  }
}
