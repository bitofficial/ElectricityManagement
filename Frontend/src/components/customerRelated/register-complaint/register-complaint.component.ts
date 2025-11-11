import { Component } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-complaint',
  standalone:true,
  imports:[FormsModule,CommonModule,RouterLink],
  templateUrl: './register-complaint.component.html',
  styleUrls: ['./register-complaint.component.css']
})
export class RegisterComplaintComponent {
  complaint = {
    customerId: '',
    category: '',
    details: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private complaintService: ComplaintService) {}

  registerComplaint(): void {
    this.complaintService.registerComplaint(this.complaint).subscribe({
      next: (response) => {
        this.successMessage = 'Complaint registered successfully!';
        this.errorMessage = '';
        this.complaint = { customerId: '', category: '', details: '' }; // reset form
      },
      error: (err) => {
        this.errorMessage = 'Failed to register complaint. Please try again later.';
        this.successMessage = '';
      }
    });
  }
}
