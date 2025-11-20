import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface FeatureCard {
  title: string;
  description: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sme-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  smeId: string = '';
  role: string = 'SME';

  stats = {
    totalComplaints: 0,
    resolvedComplaints: 0,
    pendingComplaints: 0,
    inprogressComplaints:0
  };

  features: FeatureCard[] = [
    {
      title: 'All Complaints',
      description: 'View all complaints raised by customers.',
      route: '/sme/complaints',
      icon: 'bi bi-list-ul'
    },
    {
      title: 'Pending Complaints',
      description: 'View complaints waiting for SME action.',
      route: '/sme/resolve-complaint',
      icon: 'bi bi-hourglass-split'
    },
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.smeId = localStorage.getItem('smeId') || '_';
    this.fetchStats();
  }

  /** 🔹 Fetch SME stats */
  fetchStats() {
    this.http.get<any>('http://localhost:8085/api/sme/' + this.smeId+'/dashboard')
      .subscribe({
        next: (data) => {
          this.stats.totalComplaints = data.length;
          this.stats.resolvedComplaints = data.filter((complaint: any) => complaint.status === 'RESOLVED').length;
          this.stats.pendingComplaints = data.filter((complaint: any) => complaint.status === 'PENDING').length;
          this.stats.inprogressComplaints = data.filter((complaint: any) => complaint.status === 'INPROGRESS').length;
        },
        error: () => {
          console.error('Failed loading stats');
        }
      });
  }

  /** 🔹 Logout SME */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
