import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComplaintStatusService } from '../../services/complaint-status.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-complaint-status',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './complaint-status.component.html',
  styleUrls: ['./complaint-status.component.css']
})
export class ComplaintStatusComponent implements OnInit {
  complaintId!: number;
  complaint: any = null;
  allComplaints: any[] = [];
  errorMessage: string = '';
  loading = false;
private readonly rawUserId = localStorage.getItem('userId') ?? '';
  private readonly consumerNumber = this.parseConsumerNumber(this.rawUserId);
  private parseConsumerNumber(userId: string): string {
    // If your userId is "u-<number>", remove the first 2 chars ("u-")
    if (!userId) return '';
    return userId.startsWith('u-') ? userId.slice(2) : userId;
  }

  constructor(private complaintStatusService: ComplaintStatusService) {}

  ngOnInit(): void {
    this.fetchAllComplaints();
  }

  /** Fetch all complaints of this consumer */
  fetchAllComplaints(): void {
    this.loading = true;
    this.errorMessage = '';
    this.complaint = null;

    if (!this.consumerNumber) {
      this.loading = false;
      this.errorMessage = 'Consumer number not found. Please log in again.';
      return;
    }

    this.complaintStatusService.getComplaintsByConsumer(this.consumerNumber).subscribe({
      next: (data) => {
        this.allComplaints = Array.isArray(data) ? data : [];
        console.log(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching complaints:', err);
        this.errorMessage = 'Unable to fetch complaint history.';
        this.loading = false;
      }
    });
  }

  /** Fetch a specific complaint by ID */
  getComplaintStatus(): void {
    this.errorMessage = '';
    this.complaint = null;
    this.allComplaints = [];

    if (!this.complaintId) {
      // If no complaint ID entered, just show all
      this.fetchAllComplaints();
      return;
    }

    this.loading = true;

    this.complaintStatusService.getComplaintById(this.complaintId,this.consumerNumber).subscribe({
      next: (data) => {
        this.complaint = data;
        this.loading = false;

        if (!data) this.errorMessage = 'No complaint found with this ID.';
      },
      error: (err) => {
        console.error('Error fetching complaint:', err);
        this.errorMessage = 'Complaint not found or an error occurred.';
        this.loading = false;
      }
    });
  }
}
