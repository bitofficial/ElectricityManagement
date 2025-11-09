import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManageConnectionService } from '../../services/manage-connection.service';

@Component({
  selector: 'app-manage-connection',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './manage-connection.component.html',
  styleUrl: './manage-connection.component.css'
})
export class ManageConnectionComponent {

  consumerId!: number;
  consumer: any = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private connectionService: ManageConnectionService) {}

  // Fetch consumer by ID
  getConsumerById(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.consumer = null;

    if (!this.consumerId) {
      this.errorMessage = 'Please enter a valid consumer ID.';
      return;
    }

    this.connectionService.getConsumerById(this.consumerId).subscribe({
      next: (data) => {
        if (data) this.consumer = data;
        else this.errorMessage = 'No consumer found with this ID.';
      },
      error: (err) => {
        console.error('Error fetching consumer:', err);
        this.errorMessage = 'Error fetching consumer details.';
      }
    });
  }

  // Disconnect Consumer
  disconnectConsumer(): void {
    this.connectionService.disconnectConsumer(this.consumerId).subscribe({
      next: () => {
        this.successMessage = 'Consumer disconnected successfully.';
        this.consumer.connectionStatus = 'DISCONNECTED';
      },
      error: (err) => {
        console.error('Error disconnecting consumer:', err);
        this.errorMessage = 'Failed to disconnect consumer.';
      }
    });
  }

  // Reconnect Consumer
  reconnectConsumer(): void {
    this.connectionService.reconnectConsumer(this.consumerId).subscribe({
      next: () => {
        this.successMessage = 'Consumer reconnected successfully.';
        this.consumer.connectionStatus = 'ACTIVE';
      },
      error: (err) => {
        console.error('Error reconnecting consumer:', err);
        this.errorMessage = 'Failed to reconnect consumer.';
      }
    });
  }
}
