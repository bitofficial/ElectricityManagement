import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports:[FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true
})
export class HomeComponent implements OnInit {
  features = [
    {
      title: 'View Bill',
      description: 'Check your current month’s electricity bill and payment details.',
      icon: 'bi bi-file-earmark-text',
      route: '/customer/view-bill'
    },
    {
      title: 'Pay Bill',
      description: 'Make secure and quick bill payments online.',
      icon: 'bi bi-currency-rupee',
      route: '/customer/pay-bill'
    },
    {
      title: 'Bill History',
      description: 'View and download your previous bill records.',
      icon: 'bi bi-clock-history',
      route: '/customer/bill-history'
    },
    {
      title: 'Register Complaint',
      description: 'Submit service or billing-related complaints.',
      icon: 'bi bi-exclamation-triangle',
      route: '/customer/register-complaint'
    },
    {
      title: 'Complaint Status',
      description: 'Track the status of your submitted complaints.',
      icon: 'bi bi-chat-left-dots',
      route: '/customer/complaint-status'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
