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

   private readonly rawUserId = localStorage.getItem('userId') ?? '';
   consumerNumber = this.parseConsumerNumber(this.rawUserId);
   private parseConsumerNumber(userId: string): string {
    // If your userId is "u-<number>", remove the first 2 chars ("u-")
    if (!userId) return '';
    return userId.startsWith('u-') ? userId.slice(2) : userId;
  }
  constructor(private smeService: SmeService) {}

  searchComplaint(): void {
    this.complaint = null;
    this.errorMessage = '';
    this.loading = true;
    console.log("...."+this.consumerNumber)
    this.smeService.getComplaintById(this.searchKey,this.consumerNumber).subscribe({
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
