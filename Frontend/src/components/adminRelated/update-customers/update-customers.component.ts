// src/components/adminRelated/update-customers/update-customers.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ProfileService } from '../../services/profile.service';
import { RouterLink } from '@angular/router';

interface BackendProfile {
  id?: number;
  consumerNumber?: string; // numeric string (without prefix)
  fullName?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  email?: string;
  mobile?: string;
  customerType?: string;
  electricalSection?: string;
  userId?: string; // e.g. "u-1212344567689"
  password?: string | null;
  confirmPassword?: string | null;
  connection_status?: string;
}

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './update-customers.component.html',
  styleUrls: ['./update-customers.component.css']
})
export class UpdateCustomersComponent {
  searchId = '';
  customer: BackendProfile | null = null;

  // local password inputs (not directly stored in customer)
  newPassword = '';
  confirmPassword = '';

  successMessage = '';
  errorMessage = '';

  // indicates that customer details were successfully fetched and form may be edited
  loaded = false;

  constructor(
    private adminService: AdminService,
    private profileService: ProfileService
  ) {}

  fetchCustomer(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.customer = null;
    this.loaded = false;

    if (!this.searchId?.trim()) {
      this.errorMessage = 'Please enter a customer identifier to search.';
      return;
    }

    // call your existing service; adapt if you need to search by consumerNumber vs userId
    this.profileService.getProfile('u-'+this.searchId).subscribe({
      next: (data: BackendProfile) => {
        this.customer = data;
        this.newPassword = '';
        this.confirmPassword = '';
        this.loaded = true; // now allow editing
        
      },
      error: (err) => {
        console.error('Error fetching customer:', err);
        this.errorMessage = err?.error?.message || 'Customer not found. Please try again.';
        this.loaded = false;
      }
    });
  }


  
  updateCustomer(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.customer) {
      this.errorMessage = 'No customer loaded to update.';
      return;
    }

    if (!this.loaded) {
      this.errorMessage = 'Please fetch customer details before updating.';
      return;
    }

    // If admin entered newPassword, ensure confirm matches
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match.';
      return;
    }

    // Determine identifier to send to profileService (service substring logic expects prefixed id)
    const identifier = this.customer.userId ?? this.customer.consumerNumber ?? '';
    if (!identifier) {
      this.errorMessage = 'Unable to determine user identifier to update.';
      return;
    }

    // Build payload
    const rawPayload: Partial<BackendProfile & { newPassword?: string; confirmPassword?: string }> = {
      fullName: this.customer.fullName,
      address: this.customer.address,
      city: this.customer.city,
      state: this.customer.state,
      pincode: this.customer.pincode,
      email: this.customer.email,
      mobile: this.customer.mobile,
      customerType: this.customer.customerType,
      electricalSection: this.customer.electricalSection,
      userId: this.customer.userId // service expects prefixed id (it substrings inside)
    };

    if (this.newPassword) {
      rawPayload.newPassword = this.newPassword;
      rawPayload.confirmPassword = this.confirmPassword;
    }

    // Clean payload (remove undefined keys)
    const payload = Object.fromEntries(
      Object.entries(rawPayload).filter(([_, v]) => v !== undefined)
    ) as Partial<BackendProfile & { newPassword?: string; confirmPassword?: string }>;

    this.profileService.updateProfile(identifier, payload).subscribe({
      next: (res) => {
        this.successMessage = 'Customer details updated successfully!';
        this.errorMessage = '';
        // Optionally refresh to ensure UI shows freshest data
        setTimeout(() => {
  this.successMessage = '';
  this.errorMessage = '';
}, 3000);


      },
      error: (err) => {
        console.error('Error updating customer:', err);
                // Optionally refresh to ensure UI shows freshest data
        setTimeout(() => {
  this.successMessage = '';
  this.errorMessage = '';
}, 3000);

        this.errorMessage = err?.error?.message || 'Failed to update customer details.';
      }
    });
  }
}
