import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BillHistoryService } from '../../services/bill-history.service';

@Component({
  selector: 'app-bill-history',
  standalone:true,
  imports: [FormsModule, CommonModule],
  templateUrl: './bill-history.component.html',
  styleUrls: ['./bill-history.component.css']
})
export class BillHistoryComponent implements OnInit {

  bills: any[] = [];

  constructor(private billHistoryService: BillHistoryService) {}

  ngOnInit(): void {
    this.loadBillHistory();
  }

  loadBillHistory(): void {
    // Replace with dynamic customerId if needed (e.g., from login)
    const customerId = 101; 
    this.billHistoryService.getBillHistory(customerId).subscribe({
      next: (data) => this.bills = data,
      error: (err) => console.error('Error loading bill history', err)
    });
  }
}
