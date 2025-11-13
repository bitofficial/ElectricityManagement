import { Component, OnInit } from '@angular/core';
import { AdminComplaintService } from '../../services/admin-complaint.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({

  selector: 'app-admin-complaints',
  imports: [FormsModule, CommonModule, RouterLink],
  standalone:true,
  templateUrl: './admin-complaints.component.html',
  styleUrls: ['./admin-complaints.component.css']
})
export class AdminComplaintsComponent implements OnInit {
  complaints: any[] = [];
  filteredComplaints: any[] = [];
  loading = false;
  searchQuery = '';

  constructor(private complaintService: AdminComplaintService) {}

  ngOnInit(): void {
    this.fetchComplaints();
  }

  fetchComplaints(): void {
    this.loading = true;
    this.complaintService.getAllComplaints().subscribe({
      next: (data) => {
        this.complaints = data;
        this.filteredComplaints = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching complaints:', err);
        this.loading = false;
      }
    });
  }

  filterComplaints(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredComplaints = this.complaints.filter(
      (c) =>
        c.consumerId.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
    );
  }

  viewDetails(complaintId: string): void {
    alert(`Viewing details for complaint: ${complaintId}`);
  }
}
