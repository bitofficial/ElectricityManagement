import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Bill {
  billId: number;
  billingMonth: string;
  unitsConsumed: number;
  pricePerUnit: number;
  amount: number;
  dueDate?: string | null;
  consumerNumber?: string | null;
  status?: string | null;
  generatedAt?: string | null;
  meterId?: string | null;
  paymentDate?: string | null;
  // any other fields...
}

@Component({
  selector: 'app-admin-view-bill',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './admin-view-bill.component.html',
  styleUrls: ['./admin-view-bill.component.css'],
  standalone: true
})
export class AdminViewBillComponent implements OnInit {

  bills: Bill[] = [];
  searchText: string = '';
  filterStatus: string = '';
  errorMessage: string = '';

  // local storage key for backup
  private readonly STORAGE_KEY = 'bills_backup';

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.billService.getAllBills().subscribe({
      next: (data: Bill[]) => {
        // Normalize data if needed (optional)
        this.bills = data.map(b => ({
          ...b,
          // ensure status is normalized to first-letter capitalized if needed
          status: b.status ? ('' + b.status).toString() : 'Unpaid'
        }));

        this.errorMessage = '';
        // save a local backup
        try {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.bills));
        } catch (e) {
          console.warn('Failed to save bills backup to localStorage', e);
        }
      },
      error: (err) => {
        console.error('Failed to load bills from server', err);
        this.errorMessage = 'Failed to load bills from server. Loading saved data...';

        const localData = localStorage.getItem(this.STORAGE_KEY);
        if (localData) {
          try {
            this.bills = JSON.parse(localData);
            this.errorMessage = '';
          } catch (e) {
            console.error('Failed to parse local backup', e);
            this.bills = [];
            this.errorMessage = 'Failed to load bills from server and local backup is corrupted.';
          }
        } else {
          this.bills = [];
          this.errorMessage = 'Failed to load bills from server and no local backup found.';
        }
      }
    });
  }

  // returns filtered array for the table
  filteredBills(): Bill[] {
    const text = this.searchText?.trim().toLowerCase() || '';
    const statusFilter = this.filterStatus?.trim().toLowerCase() || '';

    return this.bills.filter((bill) => {
      // safe-access fields
      const consumer = (bill.consumerNumber ?? '').toString().toLowerCase();
      const month = (bill.billingMonth ?? '').toString().toLowerCase();

      // search matches consumerNumber or billingMonth (partial)
      const matchesSearch = !text || consumer.includes(text) || month.includes(text) || ('' + bill.billId).includes(text);

      // status matching: accept 'paid' or 'unpaid' case-insensitive
      const billStatus = (bill.status ?? '').toString().toLowerCase();
      const matchesStatus = !statusFilter || billStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  // helper used in template for badge class
  isPaid(status?: string | null): boolean {
    return (status ?? '').toString().toLowerCase() === 'paid';
  }
}
