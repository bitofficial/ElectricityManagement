import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface FeatureCard {
  title: string;
  description: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  adminId: string = '_';
  role: string = 'Administrator';

  stats = {
    customers: 0,
    bills: 0,
    pendingComplaints: 0,
  };

  features: FeatureCard[] = [
    {
      title: 'Add Bill',
      description: 'Generate new bills for customers.',
      route: '/admin/add-bill',
      icon: 'bi bi-file-earmark-plus'
    },
    {
      title: 'Add Customers',
      description: 'Update, view, or deactivate customer connections.',
      route: '/admin/add-customer',
      icon: 'bi bi-people'
    },
    {
      title: 'View Complaints',
      description: 'Track and manage customer complaints.',
      route: '/admin/complaints',
      icon: 'bi bi-exclamation-triangle'
    },
    {
      title: 'Manage Connection',
      description: 'Manage customer connections.',
      route: '/admin/manage-connection',
      icon: 'bi bi-exclamation-triangle'
    }
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminUserId') || 'ada';
  }

  /** ✅ Logout */
  logout(): void {
    localStorage.removeItem('adminUserId');
    this.router.navigate(['/admin/login']);
  }
}