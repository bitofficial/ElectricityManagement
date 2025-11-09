import { Component } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resolve-complaint',
   standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './resolve-complaint.component.html',
  styleUrls: ['./resolve-complaint.component.css']
})
export class ResolveComplaintComponent {
  complaintId: string = '';
  complaint: any = null;
  remarks: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private complaintService: ComplaintService) {}

  getComplaint(): void {
    this.complaintService.getComplaintById(this.complaintId).subscribe({
      next: (data) => {
        this.complaint = data;
        this.errorMessage = '';
        this.successMessage = '';
      },
      error: () => {
        this.errorMessage = 'Complaint not found. Please check the ID.';
        this.complaint = null;
      }
    });
  }

  resolveComplaint(): void {
    const updatedComplaint = {
      ...this.complaint,
      remarks: this.remarks,
      status: this.complaint.status
    };

    this.complaintService.updateComplaint(updatedComplaint).subscribe({
      next: () => {
        this.successMessage = 'Complaint updated successfully!';
        this.errorMessage = '';
        this.remarks = '';
      },
      error: () => {
        this.errorMessage = 'Failed to update complaint. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
