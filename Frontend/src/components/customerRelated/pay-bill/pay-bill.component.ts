import { Component, OnInit } from '@angular/core';
import { PayBillService } from '../../services/pay-bill.service'; // service we'll create
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pay-bill',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './pay-bill.component.html', 
  styleUrls: ['./pay-bill.component.css']
})
export class PayBillComponent implements OnInit {

  bill: any = {};       // Bill details for display
  payment: any = {};    // Payment form model
  paymentSuccess = false;
  paymentError = '';
  transactionId = '';

  constructor(private payBillService: PayBillService) {}

  ngOnInit(): void {
    // Normally you'd fetch this from backend using consumer ID
    this.bill = {
      consumerId: 'CUST1001',
      billNumber: 'BILL202511',
      billingMonth: 'October 2025',
      amount: 1200,
      dueDate: new Date('2025-11-15')
    };

    // Initialize empty payment fields
    this.payment = {
      method: '',
      upiId: '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    };
  }

  makePayment(form?: NgForm): void {
    this.paymentSuccess = false;
    this.paymentError = '';

    // Simple validation
    if (!this.payment.method) {
      this.paymentError = 'Please select a payment method.';
      return;
    }

    // Mock local payment logic
    const paymentRequest = {
      consumerId: this.bill.consumerId,
      billNumber: this.bill.billNumber,
      amount: this.bill.amount,
      method: this.payment.method,
      paymentDetails: this.payment
    };

    // Call backend API (mock for now)
    this.payBillService.processPayment(paymentRequest).subscribe({
      next: (response) => {
        this.paymentSuccess = true;
        this.transactionId = response.transactionId;
      },
      error: (err) => {
        console.error('Payment failed:', err);
        this.paymentError = 'Payment failed. Please try again.';
      }
    });
  }
}
