import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComplaintStatusService } from '../../services/complaint-status.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-complaint-status',
  standalone:true,
  imports:[FormsModule, CommonModule, RouterLink],
  templateUrl: './complaint-status.component.html',
  styleUrls: ['./complaint-status.component.css']
})
export class ComplaintStatusComponent {

  complaintId!: number;
  complaint: any = null;
  errorMessage: string = '';

  constructor(private complaintStatusService: ComplaintStatusService) {}

  getComplaintStatus(): void {
    this.errorMessage = '';
    this.complaint = null;

    if (!this.complaintId) {
      this.errorMessage = 'Please enter a valid Complaint ID.';
      return;
    }

    this.complaintStatusService.getComplaintById(this.complaintId).subscribe({
      next: (data) => {
        this.complaint = data;
        if (!data) this.errorMessage = 'No complaint found with this ID.';
      },
      error: (err) => {
        console.error('Error fetching complaint:', err);
        this.errorMessage = 'Complaint not found or an error occurred.';
      }
    });
  }
}
