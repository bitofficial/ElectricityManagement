import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-customer',
  imports:[FormsModule,CommonModule],
  standalone:true,
  templateUrl: './update-customers.component.html',
  styleUrls: ['./update-customers.component.css']
})
export class UpdateCustomersComponent {
  searchId: string = '';
  customer: any = null;
  successMessage = '';
  errorMessage = '';

  constructor(private adminService: AdminService) {}

  fetchCustomer(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.adminService.getCustomerById(this.searchId).subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (err) => {
        console.error('Error fetching customer:', err);
        this.errorMessage = 'Customer not found. Please try again.';
      }
    });
  }

  updateCustomer(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.adminService.updateCustomer(this.customer).subscribe({
      next: (res) => {
        this.successMessage = 'Customer details updated successfully!';
      },
      error: (err) => {
        console.error('Error updating customer:', err);
        this.errorMessage = 'Failed to update customer details.';
      }
    });
  }
}
