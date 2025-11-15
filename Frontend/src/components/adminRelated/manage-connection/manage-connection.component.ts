import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManageConnectionService } from '../../services/manage-connection.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-connection',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './manage-connection.component.html',
  styleUrls: ['./manage-connection.component.css']
})
export class ManageConnectionComponent {

  consumerId: string = '';
  consumer: any = null;

  successMessage: string = '';
  errorMessage: string = '';

  isLoading = false;
  isProcessing = false;

  // Popup state
  showPopup = false;
  pendingStatus: 'Active' | 'Inactive' | '' = '';

  constructor(private connectionService: ManageConnectionService) {}

  /** Search consumer */
  getConsumerById(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.consumer = null;

    if (!this.consumerId || this.consumerId.trim().length < 5) {
      this.errorMessage = 'Please enter a valid consumer number.';
      this.hideMessages();
      return;
    }

    this.isLoading = true;

    this.connectionService.getConsumerById(this.consumerId).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (!res) {
          this.errorMessage = 'No consumer found.';
          this.hideMessages();
          return;
        }

        this.consumer = {
          consumerNumber: res.consumerNumber,
          fullName: res.fullName,
          customerType: res.customerType,
          email: res.email,
          mobile: res.mobile,
          connection_status: res.connection_status
        };
      },
      error: (err: any) => {
        console.error("Fetch error:", err);
        this.isLoading = false;
        this.errorMessage = 'Failed to fetch consumer.';
        this.hideMessages();
      }
    });
  }

  /** ===============================
   *  OPEN POPUP (called by checkbox)
   * =============================== */
  openConfirmDialog(status: 'Active' | 'Inactive') {
    this.pendingStatus = status;
    this.showPopup = true;
  }

  /** ===============================
   *  CLOSE POPUP (cancel button)
   * =============================== */
  closePopup() {
    this.showPopup = false;
    this.pendingStatus = '';
  }

  /** ===============================
   *  CONFIRM POPUP → CALL API
   * =============================== */
  confirmStatusChange(): void {
    if (!this.consumer || !this.pendingStatus) return;

    this.isProcessing = true;

    this.connectionService.updateConsumerStatus(
      this.consumer.consumerNumber,
      this.pendingStatus
    ).subscribe({
      next: () => {
        this.consumer.connection_status = this.pendingStatus;
        this.successMessage = `Status updated to ${this.pendingStatus}!`;

        this.showPopup = false;
        this.pendingStatus = '';
        this.isProcessing = false;

        this.hideMessages();
      },
      error: (err: any) => {
        console.error("Status update error:", err);
        this.errorMessage = 'Failed to update status.';

        this.showPopup = false;
        this.pendingStatus = '';
        this.isProcessing = false;

        this.hideMessages();
      }
    });
  }

  /** Auto-hide alerts */
  hideMessages() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 2000);
  }
}
