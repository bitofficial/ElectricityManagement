import { Component, OnInit } from '@angular/core';
import { AdminComplaintService } from '../../services/admin-complaint.service';
// import { AdminService } from '../../services/';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-complaints',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './admin-complaints.component.html',
  styleUrls: ['./admin-complaints.component.css']
})
export class AdminComplaintsComponent implements OnInit {

  complaints: any[] = [];
  filteredComplaints: any[] = [];
  loading = false;
  searchQuery = '';

  // MODAL STATE
  showStatusModal = false;
  activeComplaint: any = null;
  selectedStatus: string = "";
  selectedNotes: string = '';
  selectedSME: string | null = null;
  modalSuccessMessage = '';

  // SME LIST FROM API
  smeList: any[] = [];
  filteredSME: any[] = [];

  constructor(
    private complaintService: AdminComplaintService,
    private smeService: AdminComplaintService
  ) {}

  ngOnInit(): void {
    this.fetchAllSMEs();
    this.fetchComplaints();
  }

  /** ------------------------ FETCH ALL SMEs ------------------------ */
  fetchAllSMEs() {
    this.smeService.getAllSMEs().subscribe({
      next: (data) => {
        this.smeList = data;
        console.log("SMEs Loaded:", data);
      },
      error: (err) => {
        console.error("Failed to fetch SME list", err);
      }
    });
  }

  /** ------------------------ FETCH COMPLAINTS ------------------------ */
  fetchComplaints(): void {
    this.loading = true;

    this.complaintService.getAllComplaints().subscribe({
      next: data => {
        this.complaints = data;
        this.filteredComplaints = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching complaints', err);
        this.loading = false;
      }
    });
  }

  filterComplaints(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredComplaints = this.complaints.filter(c =>
      c.consumerNumber.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q)
    );
  }

  /** ------------------------ OPEN POPUP ------------------------ */
  openStatusModal(complaint: any) {
    this.activeComplaint = complaint;
    this.selectedStatus = complaint.status;
    this.selectedNotes = complaint.notes || '';

    const category = complaint.category.toLowerCase();

    // Category-based SME filtering
    if (category.includes('meter')) {
      this.filteredSME = this.smeList.filter(s => s.department.toLowerCase() === 'meter');
    } else if (category.includes('billing')) {
      this.filteredSME = this.smeList.filter(s => s.department.toLowerCase() === 'billing');
    } else if (category.includes('power')) {
      this.filteredSME = this.smeList.filter(s => s.department.toLowerCase() === 'power cut');
    } else {
      this.filteredSME = this.smeList;
    }

    this.showStatusModal = true;
    this.modalSuccessMessage = '';
  }

  closeStatusModal() {
    this.showStatusModal = false;
    this.selectedSME = null;
  }

  /** ------------------------ UPDATE NOTES + STATUS ------------------------ */
  updateNotesStatus() {
    this.complaintService.updateComplaintStatus({
      complaintId: this.activeComplaint.complaintId,
      status: this.selectedStatus,
      notes: this.selectedNotes
    }).subscribe({
      next: () => {
        setTimeout(() => this.closeStatusModal(), 2000);
      }
    });
  }

  /** ------------------------ APPLY STATUS CHANGE ------------------------ */
  applyStatusChange() {
    if (!this.selectedStatus || !this.selectedSME) return;

    const complaintId = this.activeComplaint.complaintId;

    this.complaintService.updateComplaintSME(complaintId, this.selectedSME).subscribe({
      next: () => {
        this.modalSuccessMessage = 'SME assigned successfully!';

        // Update UI locally
        this.activeComplaint.assignedSme = this.selectedSME;
        this.activeComplaint.status = this.selectedStatus;

        this.updateNotesStatus();
      },
      error: err => {
        console.error('SME update failed:', err);
        this.modalSuccessMessage = 'Failed to update!';
      }
    });
  }

  // BADGE HELPERS
  isPending(status: string) { return status.toLowerCase() === 'pending'; }
  isInProgress(status: string) { return status.toLowerCase().includes('progress'); }
  isResolved(status: string) { return status.toLowerCase() === 'resolved'; }
  isRejected(status: string) { return status.toLowerCase() === 'rejected'; }

}

