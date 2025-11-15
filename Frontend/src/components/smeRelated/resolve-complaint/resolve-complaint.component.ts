import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../services/complaint.service';
import { SmeComplaintService } from '../../services/sme-complaint.service';
import { finalize } from 'rxjs/operators';

type ComplaintStatus = 'PENDING' | 'INPROGRESS' | 'RESOLVED';

/* API shapes */
interface ApiUser {
  id: number | string;
  consumerNumber?: string;
  fullName?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  email?: string;
  mobile?: string;
  customerType?: string;
  electricalSection?: string;
  userId?: string;
  // ...other fields
}

interface ApiComplaint {
  complaintId: number | string;
  user?: ApiUser;
  complaintType?: string;
  category?: string;
  description?: string;
  preferredContact?: string;
  status?: string; // e.g. "PENDING", "RESOLVED"
  dateSubmitted?: string;
  lastUpdated?: string;
  notes?: string | null;
  assignedSmeId?: string | number;
  // ...other fields
}

/* UI model (normalized) */
interface Complaint extends ApiComplaint {
  // normalized fields / UI-only
  status: ComplaintStatus;
  consumerNumber?: string;
  fullName?: string;
  editStatus?: ComplaintStatus;
  editNotes?: string;
  saving?: boolean;
  saveError?: string | null;
  isEditing?: boolean;
}

@Component({
  selector: 'app-resolve-complaint',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './resolve-complaint.component.html',
  styleUrls: ['./resolve-complaint.component.css']
})
export class ResolveComplaintComponent {
  // single-complaint search (top card)
  complaintId: string = '';
  complaint: Complaint | null = null;
  smeId: string = '';
  SearchComplaint:Complaint[]|null=null;

  // table: pending complaints list
  pendingComplaints: Complaint[] = [];
  tableSearch: string = '';
  tableLoading = false;
  tableError = '';

  // global messages
  successMessage = '';
  errorMessage = '';

  // allowed statuses for dropdown
  statuses: ComplaintStatus[] = ['PENDING', 'INPROGRESS', 'RESOLVED'];

  constructor(
    private complaintService: ComplaintService,
    private smecomplaintService: SmeComplaintService
  ) {}

  ngOnInit(): void {
    this.smeId = localStorage.getItem('smeId') || '';
    this.loadPendingComplaints();
  }

  // ---------------------- Normalizers ----------------------
  private normalizeStatus(apiStatus?: string): ComplaintStatus {
    if (!apiStatus) return 'PENDING';
    const s = apiStatus.trim().toUpperCase();
    if (s === 'PENDING') return 'PENDING';
    if (s === 'INPROGRESS' || s === 'IN_PROGRESS' || s === 'IN PROGRESS') return 'INPROGRESS';
    if (s === 'RESOLVED' || s === 'CLOSED') return 'RESOLVED';
    return 'PENDING';
  }

  private apiStatusFromLocal(local: ComplaintStatus | string | undefined): string {
    // convert UI status back to backend uppercase
    if (!local) return 'PENDING';
    const s = String(local);
    if (s === 'PENDING') return 'PENDING';
    if (s === 'INPROGRESS') return 'INPROGRESS';
    if (s === 'RESOLVED') return 'RESOLVED';
    return s.toUpperCase();
  }

  private toComplaint(api: ApiComplaint): Complaint {
    const consumerNumber = api.user?.consumerNumber ?? '';
    const fullName = api.user?.fullName ?? '';
    return {
      ...api,
      consumerNumber,
      fullName,
      status: this.normalizeStatus(api.status),
      editStatus: this.normalizeStatus(api.status),
      editNotes: api.notes ?? '',
      saving: false,
      saveError: null,
      isEditing: false
    };
  }

  // ---------- Single-complaint fetch ----------
  getComplaint(): void {
    this.clearMessages();
    if (!this.complaintId?.trim()) {
      this.errorMessage = 'Please enter a complaint ID.';
      return;
    }

    this.smecomplaintService.getAllComplaints(this.smeId)
      .pipe(finalize(() => (this.tableLoading = false)))
      .subscribe({
        next: (list: ApiComplaint[]) => {
          const mapped = (list || []).map(c => this.toComplaint(c));
          this.SearchComplaint = mapped.filter(c => c.complaintId == this.complaintId);
          this.complaint=this.SearchComplaint[0];
          console.log(this.SearchComplaint)
        },
        error: (err: any) => {
          console.error('Failed to load complaints', err);
          this.tableError = 'Failed to load complaints.';
        }
      });


  }

  // ---------- Load & filter pending complaints using smecomplaintService.getAllComplaints(smeId) ----------
  loadPendingComplaints(): void {
    this.clearMessages();
    this.tableLoading = true;
    this.tableError = '';

    this.smecomplaintService.getAllComplaints(this.smeId)
      .pipe(finalize(() => (this.tableLoading = false)))
      .subscribe({
        next: (list: ApiComplaint[]) => {
          const mapped = (list || []).map(c => this.toComplaint(c));
          this.pendingComplaints = mapped.filter(c => c.status === 'PENDING' || c.status==='INPROGRESS');
        },
        error: (err: any) => {
          console.error('Failed to load complaints', err);
          this.tableError = 'Failed to load complaints.';
        }
      });
  }

  // search using API (server-side) or fallback to client-side filter
  searchPending(): void {
    this.clearMessages();
    const q = (this.tableSearch || '').trim();
    if (!q) {
      this.loadPendingComplaints();
      return;
    }

    this.tableLoading = true;

    // If SmeComplaintService provides a search endpoint, use it. Otherwise fallback to client-side filter.
    const hasSearch = typeof (this.smecomplaintService as any).searchComplaints === 'function';

    if (hasSearch) {
      (this.smecomplaintService as any).searchComplaints(this.smeId, q)
        .pipe(finalize(() => (this.tableLoading = false)))
        .subscribe({
          next: (list: ApiComplaint[]) => {
            const mapped = (list || []).map(c => this.toComplaint(c));
            this.pendingComplaints = mapped.filter(c => c.status === 'PENDING' || c.status==='INPROGRESS');
          },
          error: (err: any) => {
            console.error('Search failed', err);
            this.tableError = 'Search failed. Try again later.';
          }
        });
    } else {
      // client-side search fallback
      this.smecomplaintService.getAllComplaints(this.smeId)
        .pipe(finalize(() => (this.tableLoading = false)))
        .subscribe({
          next: (list: ApiComplaint[]) => {
            const mapped = (list || []).map(c => this.toComplaint(c));
            const qLower = q.toLowerCase();
            const filtered = mapped.filter(c =>
              ('' + c.complaintId).toLowerCase().includes(qLower) ||
              (c.consumerNumber || '').toLowerCase().includes(qLower) ||
              (c.fullName || '').toLowerCase().includes(qLower) ||
              (c.description || '').toLowerCase().includes(qLower)
            );
            this.pendingComplaints = filtered.filter(c => c.status === 'PENDING' || c.status==='INPROGRESS');
          },
          error: (err: any) => {
            console.error('Search (fallback) failed', err);
            this.tableError = 'Search failed. Try again later.';
          }
        });
    }
  }

  // ---------- Row editing helpers ----------
  enableEdit(row: Complaint): void {
    row.isEditing = true;
    row.saveError = null;
  }

  cancelEdit(row: Complaint): void {
    row.isEditing = false;
    row.editStatus = row.status;
    row.editNotes = row.notes ?? '';
    row.saveError = null;
  }

  saveRow(row: Complaint): void {
    this.clearMessages();
    row.saveError = null;

    if (!row.editStatus) {
      row.saveError = 'Please select a status.';
      return;
    }

    // Prepare payload - use complaintId and convert status to backend uppercase
    const payload: any = {
      complaintId: row.complaintId,
      status: this.apiStatusFromLocal(row.editStatus),
      notes: row.editNotes
    };

    row.saving = true;
    this.complaintService.updateComplaint(payload)
      .pipe(finalize(() => (row.saving = false)))
      .subscribe({
        next: (updated: ApiComplaint) => {
          const normalized = this.toComplaint(updated);
          Object.assign(row, normalized);
          row.isEditing = false;
          this.successMessage = `Complaint ${row.complaintId} updated successfully.`;
          if (row.status === 'RESOLVED') {
            this.pendingComplaints = this.pendingComplaints.filter(c => c.complaintId !== row.complaintId);
          }
        },
        error: (err: any) => {
          console.error('Failed to update complaint', err);
          row.saveError = 'Failed to save. Try again.';
        }
      });
  }

  // view details loads the row into the top single-complaint card for editing
  viewDetails(row: Complaint): void {
    this.clearMessages();
    this.complaint = this.toComplaint(row);
    this.complaintId = String(row.complaintId);
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
  }

  // update the currently loaded single complaint from UI (top card)
  resolveComplaint(): void {
    this.clearMessages();
    if (!this.complaint) {
      this.errorMessage = 'No complaint loaded to update.';
      return;
    }

    const payload = {
      complaintId: this.complaint.complaintId,
      status: this.complaint.editStatus,
      notes: this.complaint.editNotes
    };

    this.complaintService.updateComplaint(payload).subscribe({
      next: (updated: ApiComplaint) => {
        this.complaint = this.toComplaint(updated);
        this.successMessage = 'Complaint updated successfully!';
        const idx = this.pendingComplaints.findIndex(c => c.complaintId === this.complaint!.complaintId);
        if (idx > -1) {
          if (this.complaint!.status === 'RESOLVED') {
            this.pendingComplaints.splice(idx, 1);
          } else {
            this.pendingComplaints[idx] = this.toComplaint(this.complaint!);
          }
        }
      },
      error: (err: any) => {
        console.error('resolveComplaint failed', err);
        this.errorMessage = 'Failed to update complaint. Please try again.';
      }
    });
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.tableError = '';
  }
}
