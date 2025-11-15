import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface SelectedBill {
  billId: string;
  billingMonth?: string;
  generatedAt?:string | Date;
  dueDate?: string | Date;
  dueAmount?: number;
  payableAmount: number;
  [key: string]: any;
}

@Component({
  selector: 'app-bill-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-bill-summary.component.html',
  styleUrls: ['./view-bill-summary.component.css']
})
export class ViewBillSummaryComponent implements OnInit {

  selectedBills: SelectedBill[] = [];
  totalAmount = 0;

  ngOnInit(): void {
    this.loadSelectedBills();
  }

  loadSelectedBills(): void {
    try {
      const raw = localStorage.getItem('selectedBills') || '[]';
      this.selectedBills = (JSON.parse(raw) as SelectedBill[]).map(b => ({
        ...b,
        payableAmount: Number(b.payableAmount) || 0
      }));
      this.totalAmount = this.selectedBills.reduce((sum, b) => sum + (b.payableAmount || 0), 0);
    } catch {
      this.selectedBills = [];
      this.totalAmount = 0;
    }
  }

  removeBill(billId: string): void {
    this.selectedBills = this.selectedBills.filter(b => b.billId !== billId);
    localStorage.setItem('selectedBills', JSON.stringify(this.selectedBills));
    this.totalAmount = this.selectedBills.reduce((sum, b) => sum + (b.payableAmount || 0), 0);
  }

  proceedToPay(): void {
    // Navigate to the pay bill page
    window.location.href = '/customer/pay-bill';
  }
}
