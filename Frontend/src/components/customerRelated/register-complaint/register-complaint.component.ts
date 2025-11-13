import { Component } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-complaint',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register-complaint.component.html',
  styleUrls: ['./register-complaint.component.css']
})
export class RegisterComplaintComponent {

  complaint = {
    consumerNumber: '',
    complaintType: '__',
    category: '',
    description: '',
    preferredContact: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  private readonly rawUserId = localStorage.getItem('userId') ?? '';

  constructor(private complaintService: ComplaintService) {
    // FIX: Initialize consumerNumber inside constructor
    this.complaint.consumerNumber = this.parseConsumerNumber(this.rawUserId);
  }

  // --- Helpers ---
  private parseConsumerNumber(userId: string): string {
    if (!userId) return '';
    return userId.startsWith('u-') ? userId.slice(2) : userId;
  }

  registerComplaint(): void {
    console.log(this.complaint);

    this.complaintService.registerComplaint(this.complaint).subscribe({
      next: () => {
        this.successMessage = 'Complaint registered successfully!';
        this.errorMessage = '';
        this.complaint = {
          consumerNumber: this.parseConsumerNumber(this.rawUserId), // Pre-fill again
          complaintType: '__',
          category: '',
          description: '',
          preferredContact: ''
        };
        setTimeout(() => {
          this.successMessage = '';
        }, 3000)   
      },
      error: () => {
        this.errorMessage = 'Failed to register complaint. Please try again later.';
        this.successMessage = '';
      }
    });
  }
}