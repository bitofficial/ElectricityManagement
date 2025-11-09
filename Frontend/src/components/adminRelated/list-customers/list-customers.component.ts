import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-customer',
  imports:[FormsModule,CommonModule],
  templateUrl: './list-customers.component.html',
  standalone:true,
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  customers: any[] = [];
  searchText: string = '';
  errorMessage: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to load customers. Please try again later.';
      }
    });
  }

  filteredCustomers(): any[] {
    const text = this.searchText.toLowerCase();
    return this.customers.filter(
      (c) =>
        c.name.toLowerCase().includes(text) ||
        c.customerId.toString().includes(text)
    );
  }
}
