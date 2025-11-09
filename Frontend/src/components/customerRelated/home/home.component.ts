// home.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface FeatureCard {
  title: string;
  description: string;
  route: string;
  icon: string; // class for icon library (e.g., 'bi bi-file-earmark-text' or 'fa fa-file')
}

@Component({
  selector: 'app-home',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user = {
    firstName: 'Rajesh',
    accountNumber: 'AC-12345678',
    billingAddress: '12/4 MG Road, Sector 5, Example City, State - 400001'
  };

  currentBill: {
    period: string;
    dueDate: Date;
    amount: number;
    paid: boolean;
  } | null = null;

  features: FeatureCard[] = [
    {
      title: 'View Bills',
      description: 'See and download your recent bills and invoices.',
      route: '/customer/view-bill',
      icon: 'bi bi-receipt'
    },
    {
      title: 'Pay Bill',
      description: 'Make a secure payment online using cards or netbanking.',
      route: '/customer/pay-bill',
      icon: 'bi bi-credit-card-2-front'
    },
    {
      title: 'Bill History',
      description: 'Review your billing history and past payments.',
      route: '/customer/bill-history',
      icon: 'bi bi-clock-history'
    },
    {
      title: 'Register Complaint',
      description: 'Report an issue with your service or bill.',
      route: '/customer/register-complaint',
      icon: 'bi bi-exclamation-circle'
    },
    {
      title: 'Complaint Status',
      description: 'Track the resolution status of your raised complaints.',
      route: '/customer/complaint-status',
      icon: 'bi bi-list-check'
    },
    {
      title: 'Account Settings',
      description: 'Edit contact details, change address and preferences.',
      route: '/profile',
      icon: 'bi bi-gear'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulate fetching current bill from API
    this.loadCurrentBill();
    // In a real app, fetch user + bill via a service, e.g. userService.getProfile()
  }

  loadCurrentBill() {
    // Replace with actual HTTP call
    this.currentBill = {
      period: 'Oct 1, 2025 - Oct 31, 2025',
      dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 28), // example
      amount: 2479.50,
      paid: false
    };
  }

  logout() {
    // Clear session / tokens here (call your auth service)
    // then navigate to login
    // e.g. this.authService.logout();
    // For demo:
    console.log('Logout clicked - clearing session and redirecting to /login');
    // perform actual logout steps, e.g. localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
}
