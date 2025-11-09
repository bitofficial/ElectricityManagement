import { Component } from '@angular/core';
import { SmeService } from '../../services/sme.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-complaint',
    standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './search-complaint.component.html',
  styleUrls: ['./search-complaint.component.css']
})
export class SearchComplaintComponent {
  searchKey: string = '';
  complaint: any = null;
  loading = false;
  errorMessage = '';

  constructor(private smeService: SmeService) {}

  searchComplaint(): void {
    this.complaint = null;
    this.errorMessage = '';
    this.loading = true;

    this.smeService.getComplaintById(this.searchKey).subscribe({
      next: (data) => {
        this.complaint = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Complaint fetch error:', err);
        this.loading = false;
        this.errorMessage = 'No complaint found for the provided ID.';
      }
    });
  }
}
