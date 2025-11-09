import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-view-bill',
  imports:[FormsModule,CommonModule],
  templateUrl: './admin-view-bill.component.html',
  styleUrls: ['./admin-view-bill.component.css'],
  standalone:true
})
export class AdminViewBillComponent implements OnInit {
  bills: any[] = [];
  searchText: string = '';
  filterStatus: string = '';
  errorMessage: string = '';

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.billService.getAllBills().subscribe({
      next: (data) => {
        this.bills = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Failed to load bills. Please try again.';
      }
    });
  }

  filteredBills(): any[] {
    const text = this.searchText.toLowerCase();
    return this.bills.filter((bill) => {
      const matchesSearch =
        bill.customerId.toString().includes(text) ||
        bill.month.toLowerCase().includes(text);
      const matchesStatus =
        !this.filterStatus || bill.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
  }
}
