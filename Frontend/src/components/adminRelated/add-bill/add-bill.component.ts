import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-add-bill',
  imports:[FormsModule,CommonModule],
  templateUrl: './add-bill.component.html',
  standalone:true,
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent {
  bill = {
    customerId: '',
    month: '',
    units: 0,
    amount: 0,
    status: 'Unpaid'
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private billService: BillService) {}

  addBill(): void {
    this.billService.addBill(this.bill).subscribe({
      next: (response) => {
        this.successMessage = 'Bill added successfully!';
        this.errorMessage = '';
        this.bill = { customerId: '', month: '', units: 0, amount: 0, status: 'Unpaid' }; // reset form
      },
      error: (err) => {
        this.errorMessage = 'Failed to add bill. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
