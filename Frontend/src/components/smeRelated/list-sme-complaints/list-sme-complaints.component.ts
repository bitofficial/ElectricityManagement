import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SmeComplaintService } from '../../services/sme-complaint.service';

@Component({
  selector: 'app-list-sme-complaint',
  standalone:true,
  imports:[FormsModule, CommonModule],
  templateUrl: './list-sme-complaints.component.html',
  styleUrls: ['./list-sme-complaints.component.css']
})
export class ListSmeComplaintComponent implements OnInit {

  complaints: any[] = [];
  errorMessage: string = '';

  constructor(private smeComplaintService: SmeComplaintService) {}

  ngOnInit(): void {
    this.getAllComplaints();
  }

  getAllComplaints(): void {
    this.smeComplaintService.getAllComplaints().subscribe({
      next: (data) => {
        this.complaints = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch complaints. Please try again later.';
        console.error(err);
      }
    });
  }
}
