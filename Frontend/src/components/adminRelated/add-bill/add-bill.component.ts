import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BillService } from '../../services/bill.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-bill',
  imports:[FormsModule,CommonModule, RouterLink],
  templateUrl: './add-bill.component.html',
  standalone:true,
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent {
  bill = {
    consumerNumber: '',
    billingMonth: '',
    unitsConsumed: 0,
    pricePerUnit:0,
    dueDate:''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private billService: BillService) {

  }

  addBill(): void {
    this.billService.addBill(this.bill).subscribe({
      next: (response) => {
        this.successMessage = 'Bill added successfully!';
        this.errorMessage = '';
        this.bill = {  consumerNumber: '',
    billingMonth: '',
    unitsConsumed: 0,
    pricePerUnit:0,
    dueDate:''}; // reset form
  setTimeout(() => {
          this.successMessage = '';
        }, 3000)   
  },
      
      error: (err) => {
        this.errorMessage = 'Failed to add bill. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
