// 

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { PayBillService } from '../../services/pay-bill.service';
import { BillService } from '../../services/bill.service';
import { Subscription } from 'rxjs';

interface SelectedBill {
  billId: string;
  billingMonth?: string;
  generated_at?: string | Date;
  dueDate?: string | Date;
  dueAmount?: number;
  payableAmount: number;
  [key: string]: any;
}

@Component({
  selector: 'app-pay-bill',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.css']
})
export class PayBillComponent implements OnInit, OnDestroy {
  selectedBills: SelectedBill[] = [];
  totalAmount = 0;
  isExpired=false;
  // Snapshot of paid bills & amount for invoice / success display
  paidBillsSnapshot: SelectedBill[] | null = null;
  paidTotal = 0;

  consumerId = localStorage.getItem('consumerId') || 'CUST1001';

  payment = {
    method: '' as '' | 'UPI' | 'Card' | 'NetBanking',
    upiId: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    bank: ''
  };

  private readonly rawUserId = localStorage.getItem('userId') ?? '';
  private readonly consumerNumber = this.parseConsumerNumber(this.rawUserId);

  paymentSuccess = false;
  paymentError = '';
  transactionId = '';
  isSubmitting = false;
   invoiceNumber = ''
  paymentId = ''
    receiptNumber = ''
   transactionDate = new Date();

  private subs: Subscription[] = [];

  constructor(
    private payBillService: PayBillService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.loadSelectedBills();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  checkExpiry() {
  if (!this.payment.expiry || this.payment.expiry.length !== 5) {
    this.isExpired = false;
    return;
  }

  const [mm, yy] = this.payment.expiry.split('/');
  const month = parseInt(mm, 10);
  const year = 2000 + parseInt(yy, 10); // YY → 20YY

  const today = new Date();
  const expiryDate = new Date(year, month - 1, 1);

  // Set expiry to END of month
  expiryDate.setMonth(expiryDate.getMonth() + 1);
  expiryDate.setDate(0);

  this.isExpired = expiryDate < today;
}

  private parseConsumerNumber(userId: string): string {
    if (!userId) return '';
    return userId.startsWith('u-') ? userId.slice(2) : userId;
  }

  loadSelectedBills(): void {
    try {
      const raw = localStorage.getItem('selectedBills') || '[]';
      this.selectedBills = JSON.parse(raw) as SelectedBill[];
      this.selectedBills = this.selectedBills.map(b => ({
        ...b,
        payableAmount: Number(b.payableAmount) || 0
      }));
      this.totalAmount = this.selectedBills.reduce((sum, b) => sum + (Number(b.payableAmount) || 0), 0);
    } catch {
      this.selectedBills = [];
      this.totalAmount = 0;
    }
  }
  // Format card number as XXXX XXXX XXXX XXXX
  formatCardNumber() {
    let value = this.payment.cardNumber.replace(/\D/g, ''); // remove non-digits

    if (value.length > 16) value = value.substring(0, 16);

    // Insert spaces every 4 digits → XXXX XXXX XXXX XXXX
    const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    this.payment.cardNumber = formatted;
  }

  // Auto-format expiry as MM/YY
  formatExpiry() {
    let value = this.payment.expiry.replace(/\D/g, '');

    if (value.length >= 3) {
      value = value.substring(0, 4);
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }

    this.payment.expiry = value;
  }

  // Validate Before Payment
  validatePayment(): boolean {
    this.paymentError = '';

    // UPI
    if (this.payment.method === 'UPI' && !this.payment.upiId.includes('@')) {
      this.paymentError = 'Invalid UPI ID. It must contain @';
      return false;
    }

    // Card number (16 digits with spaces)
    if (this.payment.method === 'Card') {
      const raw = this.payment.cardNumber.replace(/\s+/g, '');
      if (raw.length !== 16) {
        this.paymentError = 'Card number must be exactly 16 digits.';
        return false;
      }

      // Expiry
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expiryRegex.test(this.payment.expiry)) {
        this.paymentError = 'Expiry format must be MM/YY and valid month.';
        return false;
      }

      // CVV
      if (!/^\d{3}$/.test(this.payment.cvv)) {
        this.paymentError = 'CVV must be exactly 3 digits.';
        return false;
      }
    }

    // NetBanking
    if (this.payment.method === 'NetBanking' && !this.payment.bank) {
      this.paymentError = 'Please select a bank.';
      return false;
    }

    return true;
  }


  removeBill(billId: string): void {
    this.selectedBills = this.selectedBills.filter(b => b.billId !== billId);
    localStorage.setItem('selectedBills', JSON.stringify(this.selectedBills));
    this.totalAmount = this.selectedBills.reduce((sum, b) => sum + (Number(b.payableAmount) || 0), 0);
  }

  private validatePaymentForm(): string | null {
    if (!this.payment.method) return 'Please select a payment method.';

    if (this.payment.method === 'UPI') {
      if (!this.payment.upiId || !/^[\w.\-]+@[\w.\-]+$/.test(this.payment.upiId)) {
        return 'Please enter a valid UPI ID (e.g., name@bank).';
      }
    }

    if (this.payment.method === 'Card') {
      const digitsOnly = (this.payment.cardNumber || '').replace(/\s+/g, '');
      if (!/^\d{16}$/.test(digitsOnly)) return 'Card number must be 16 digits.';
      if (!/^\d{2}\/\d{2}$/.test(this.payment.expiry)) return 'Expiry must be in MM/YY format.';
      if (!/^\d{3,4}$/.test(this.payment.cvv)) return 'CVV must be 3 or 4 digits.';
    }

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

    // Ensure numeric values are correct
    this.totalAmount = Number(this.totalAmount) || this.selectedBills.reduce((s, b) => s + (Number(b.payableAmount) || 0), 0);

    const paymentRequest = {
      consumerId: this.consumerId,
      bills: this.selectedBills.map(b => ({
        billId: b.billId,
        payableAmount: Number(b.payableAmount) || 0,
        dueDate: b.dueDate,
        generated_at: b.generated_at,
        billingMonth: b.billingMonth
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

    const paySub = this.payBillService.processPayment(paymentRequest).subscribe({
      next: (response) => {
        // Always set transaction id first (from backend if present)
        this.transactionId = response?.transactionId || 'TXN' + Math.floor(Math.random() * 1000000);
        this.paymentSuccess = true;
          this.invoiceNumber = response?.invoiceNumber || 'INV' + Math.floor(100000 + Math.random() * 900000);
    this.paymentId = response?.paymentId || 'PAY' + Math.floor(100000 + Math.random() * 900000);
    this.receiptNumber = response?.receiptNumber || 'RCPT' + Math.floor(100000 + Math.random() * 900000);
    this.transactionDate = new Date();

        // TAKE SNAPSHOT BEFORE clearing selected bills
        this.paidBillsSnapshot = this.selectedBills.map(b => ({ ...b, payableAmount: Number(b.payableAmount) || 0 }));
        this.paidTotal = Number(this.totalAmount) || this.paidBillsSnapshot.reduce((s, b) => s + (Number(b.payableAmount) || 0), 0);

        // Prepare bill ids to mark as paid
        // Prepare bill ids to mark as paid
const billIds = this.paidBillsSnapshot.map(b => b.billId);

// 🔥 FIXED PAYLOAD STRUCTURE
const updatePayload = {
  // billIds: billIds,
  method: this.payment.method,
  amount: this.paidTotal,
  consumerId: this.consumerId,
  transactionId: this.transactionId,
  paymentId: this.paymentId,
  invoiceNumber: this.invoiceNumber,
  receiptNumber: this.receiptNumber
};

// 🔥 FIXED API CALL
const markSub = this.billService.markBillsAsPaid(billIds,updatePayload).subscribe({
  next: (res) => {
    console.log('Bills marked as paid:', res);

    // Clear after success
    localStorage.removeItem('selectedBills');
    this.selectedBills = [];
    this.totalAmount = 0;
    this.isSubmitting = false;
  },
  error: (err) => {
    console.error('Failed to mark bills as paid:', err);
    this.paymentError = 'Payment succeeded, but updating bill status failed.';
    this.isSubmitting = false;
  }
});

this.subs.push(markSub);

      },
      error: (err) => {
        console.error('Payment failed:', err);
        this.paymentError = (err?.error?.message) || 'Payment failed. Please try again.';
        this.paymentSuccess = false;
        this.isSubmitting = false;
      }
    });

    this.subs.push(paySub);
  }

  /** Generate and download PDF invoice */
  downloadInvoice(): void {
    // Use snapshot if available; otherwise, if paymentSuccess and no snapshot, still allow but warn
    const billsForInvoice = this.paidBillsSnapshot ?? this.selectedBills;
    const invoiceTotal = this.paidBillsSnapshot ? this.paidTotal : this.totalAmount;

    if (!this.paymentSuccess) {
      alert('Please complete a payment before downloading the invoice.');
      return;
    }

    if (!billsForInvoice || billsForInvoice.length === 0) {
      alert('No paid bill data available for invoice.');
      return;
    }

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const left = 40;
    let y = 40;

    // const invoiceNumber = 'INV' + Math.floor(100000 + Math.random() * 900000);
    // const paymentId = 'PAY' + Math.floor(100000 + Math.random() * 900000);
    // const receiptNumber = 'RCPT' + Math.floor(100000 + Math.random() * 900000);
    const transactionDate = new Date();

    // Header
    doc.setFontSize(18);
    doc.text('Electricity Bill Payment Invoice', 210, y, { align: 'center' });
    y += 30;

    doc.setFontSize(11);
    doc.text(`Invoice No: ${this.invoiceNumber}`, left, y);
    doc.text(`Payment ID: ${this.paymentId}`, 350, y);
    y += 18;
    doc.text(`Transaction ID: ${this.transactionId}`, left, y);
    doc.text(`Receipt No: ${this.receiptNumber}`, 350, y);
    y += 22;

    // Consumer Info
    doc.setFontSize(12);
    doc.text('Consumer Details', left, y);
    y += 16;
    doc.setFontSize(10);
    doc.text(`Consumer ID: ${this.consumerNumber || this.consumerId}`, left, y);
    doc.text(`Payment Method: ${this.payment.method}`, 350, y);
    y += 14;
    doc.text(`Transaction Date: ${transactionDate.toLocaleString()}`, left, y);
    y += 20;

    // Bills Table
    const tableData = billsForInvoice.map((b, i) => [
      i + 1,
      b.billId,
      b.billingMonth || '-',
      b.generated_at ? new Date(b.generated_at).toLocaleDateString() : '-',
      b.dueDate ? new Date(b.dueDate).toLocaleDateString() : '-',
      `₹ ${Number(b.payableAmount).toFixed(2)}`
    ]);

    const tableResult: any = (autoTable as any)(doc, {
      startY: y,
      head: [['#', 'Bill ID', 'Period', 'Bill Date', 'Due Date', 'Amount']],
      body: tableData,
      theme: 'striped',
      styles: { fontSize: 10, cellPadding: 6 },
      headStyles: { fillColor: [22, 160, 133] }
    });

    const finalY = (tableResult?.finalY) || (doc as any).lastAutoTable?.finalY || (y + 100);

    doc.setFontSize(11);
    doc.text(`Total Amount Paid: ₹ ${Number(invoiceTotal).toFixed(2)}`, left, finalY + 20);
    doc.text('Payment Status: SUCCESS', left, finalY + 40);

    doc.setFontSize(10);
    doc.text('Thank you for your payment.', left, finalY + 70);
    doc.text('This is a system-generated invoice.', left, finalY + 85);

    const fileName = `Invoice_${this.consumerId}_${this.invoiceNumber}.pdf`;
    doc.save(fileName);
  }
}