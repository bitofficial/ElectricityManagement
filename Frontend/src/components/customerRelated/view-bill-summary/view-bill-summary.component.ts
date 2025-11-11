import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BillService } from '../../services/bill.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-view-bill-summary',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './view-bill-summary.component.html',
  styleUrls: ['./view-bill-summary.component.css']
})
export class ViewBillSummaryComponent implements OnInit {
  consumerNumber: number = 0;
  consumerName: string = 'John Doe';
  mobile: string = '9876543210';
  bills: any[] = [];
  selectedBills: any[] = [];
  totalPayable: number = 0;
  loading = false;
  errorMessage = '';

  // Payment variables
  paymentSuccess = false;
  transactionId = '';
  receiptNumber = '';
  paymentId = '';
  transactionDate = new Date();
  transactionType = 'Credit Card';
  transactionStatus = 'Success';

  constructor(private billService: BillService, private router: Router) {}

  ngOnInit(): void {
    this.consumerNumber = Number(localStorage.getItem('consumerNumber'));
    this.loadBills();
  }

  loadBills(): void {
    this.loading = true;
    this.billService.getBillByConsumerNumber(this.consumerNumber).subscribe({
      next: (data) => {
        this.bills = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error fetching bills. Please try again later.';
        this.loading = false;
      }
    });
  }

  toggleBillSelection(bill: any, event: any): void {
    if (event.target.checked) {
      this.selectedBills.push(bill);
    } else {
      this.selectedBills = this.selectedBills.filter(
        (b) => b.billNumber !== bill.billNumber
      );
    }
    this.updateTotal();
  }

  updateTotal(): void {
    this.totalPayable = this.selectedBills.reduce(
      (sum, bill) => sum + (bill.payableAmount || 0),
      0
    );
  }

  processPayment(): void {
    if (this.selectedBills.length === 0) {
      alert('Please select at least one bill to proceed.');
      return;
    }

    // Simulate payment success
    this.paymentId = 'PAY' + Math.floor(Math.random() * 100000);
    this.transactionId = 'TXN' + Math.floor(Math.random() * 100000);
    this.receiptNumber = 'RCPT' + Math.floor(Math.random() * 100000);
    this.transactionDate = new Date();

    this.paymentSuccess = true;
  }

  downloadInvoice(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Electricity Bill Payment Invoice', 60, 15);

    doc.setFontSize(12);
    doc.text(`Consumer Number: ${this.consumerNumber}`, 15, 30);
    doc.text(`Consumer Name: ${this.consumerName}`, 15, 38);
    doc.text(`Mobile: ${this.mobile}`, 15, 46);

    doc.text(`Invoice Number: INV${Math.floor(Math.random() * 100000)}`, 15, 60);
    doc.text(`Payment ID: ${this.paymentId}`, 15, 68);
    doc.text(`Transaction ID: ${this.transactionId}`, 15, 76);
    doc.text(`Receipt Number: ${this.receiptNumber}`, 15, 84);
    doc.text(`Transaction Date: ${this.transactionDate.toLocaleString()}`, 15, 92);
    doc.text(`Transaction Type: ${this.transactionType}`, 15, 100);
    doc.text(`Transaction Status: ${this.transactionStatus}`, 15, 108);

    // Add bill details in a table
    const tableData = this.selectedBills.map((b, i) => [
      i + 1,
      b.billNumber,
      b.billPeriod,
      b.billDate,
      b.dueDate,
      b.payableAmount
    ]);

    (autoTable as any)(doc, {
      head: [['#', 'Bill Number', 'Bill Period', 'Bill Date', 'Due Date', 'Amount']],
      body: tableData,
      startY: 115
    });

    doc.text(`Total Transaction Amount: ₹${this.totalPayable}`, 15, (doc as any).lastAutoTable.finalY + 10);

    doc.save(`Invoice_${this.consumerNumber}.pdf`);
  }
}
