import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddCustomerService } from '../../services/add-customer.service';

@Component({
  selector: 'app-add-customer',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  customer = {
    name: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private addCustomerService: AddCustomerService) {}

  addCustomer(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.addCustomerService.addCustomer(this.customer).subscribe({
      next: (response) => {
        this.successMessage = 'Customer added successfully!';
        this.customer = { name: '', email: '', phone: '', address: '', username: '', password: '' };
      },
      error: (err) => {
        console.error('Error adding customer:', err);
        this.errorMessage = 'Failed to add customer. Please try again.';
      }
    });
  }
}
