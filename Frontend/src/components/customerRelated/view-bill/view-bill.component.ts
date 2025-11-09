import { Component } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-bill',
  standalone:true,
  imports:[FormsModule,CommonModule],
  
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css']
})
export class ViewBillComponent {
  customerId: string = '';
  bill: any;
  errorMessage: string = '';

  constructor(private billService: BillService) {}

  getBill(): void {
    this.billService.getBillByCustomerId(this.customerId).subscribe({
      next: (data) => {
        this.bill = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.bill = null;
        this.errorMessage = 'Bill not found. Please check your Customer ID.';
      }
    });
  }
}
