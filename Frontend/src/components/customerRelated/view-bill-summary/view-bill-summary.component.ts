import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillSummaryService } from '../../services/view-bill-summary.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-bill-summary',
  imports:[FormsModule,CommonModule],
  standalone:true,
  templateUrl: './view-bill-summary.component.html',
  styleUrls: ['./view-bill-summary.component.css']
})
export class ViewBillSummaryComponent implements OnInit {
  bill: any = {};
  loading = false;

  constructor(
    private billSummaryService: BillSummaryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBillSummary();
  }

  fetchBillSummary(): void {
    this.loading = true;

    // Normally you’d get this from backend based on logged-in consumer
    this.billSummaryService.getBillSummary('CUST1001').subscribe({
      next: (data) => {
        this.bill = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching bill summary:', err);
        this.loading = false;
      }
    });
  }

  goToPayment(): void {
    this.router.navigate(['/customer/pay-bill']);
  }
}
