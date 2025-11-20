// src/components/adminRelated/update-customers/update-customers.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ProfileService } from '../../services/profile.service';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface BackendProfile {
  id?: number;
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

  newPassword = '';
  confirmPassword = '';
  states: { name: string, cities: string[] }[] = [];
  cities: string[] = [];
  successMessage = '';
  errorMessage = '';

  isCityLocked = false;
  isStateLocked = false;

  loaded = false;

  constructor(
    private adminService: AdminService,
    private profileService: ProfileService,
    private http: HttpClient
  ) { }

  //--------------------------------------------
  // 🟦 1. State Dropdown change
  //--------------------------------------------
  onStateChange(): void {
    if (!this.customer?.state) return;

    const selected = this.states.find(s => s.name === this.customer!.state);
    this.cities = selected ? selected.cities : [];
    this.customer!.city = '';
  }

  //--------------------------------------------
  // 🟦 2. Auto-populate city/state using API
  //--------------------------------------------
  fetchLocationByPincode(): void {
    if (!this.customer?.pincode || this.customer.pincode.length !== 6) return;

    this.http.get<any[]>(`https://api.postalpincode.in/pincode/${this.customer.pincode}`)
      .subscribe({
        next: (res) => {
          const info = res[0];
          if (info?.Status === 'Success' && info.PostOffice?.length) {

            const postOffice = info.PostOffice[0];

            this.customer!.state = postOffice.State || this.customer!.state;
            this.customer!.city = postOffice.District || this.customer!.city;

            // update city dropdown list
            const matchState = this.states.find(s => s.name === this.customer!.state);
            this.cities = matchState ? [...matchState.cities] : [];

            if (this.customer!.city && !this.cities.includes(this.customer!.city)) {
              this.cities.push(this.customer!.city);
            }

            this.isStateLocked = true;
            this.isCityLocked = true;
          }
        },
        error: (err) => console.error('Error fetching location', err)
      });
  }

  //--------------------------------------------
  // 🟦 3. Fetch customer by ID
  //--------------------------------------------
  passwordsMatch(): boolean {
  return this.newPassword === this.confirmPassword;
}


  fetchCustomer(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.customer = null;
    this.loaded = false;

    if (!this.searchId.trim()) {
      this.errorMessage = 'Please enter a customer identifier to search.';
      return;
    }

    this.profileService.getProfile('u-' + this.searchId).subscribe({
      next: (data: BackendProfile) => {
        this.customer = data;
        this.newPassword = '';
        this.confirmPassword = '';
        this.loaded = true;
      },
      error: (err) => {
        console.error('Error fetching customer:', err);
        this.errorMessage = err?.error?.message || 'Customer not found. Please try again.';
        this.loaded = false;
      }
    });
  }

  //--------------------------------------------
  // 🟦 4. Update customer
  //--------------------------------------------
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

   if (this.newPassword && !this.passwordsMatch()) {
  this.errorMessage = 'New password and confirm password do not match.';
  return;
}

    const identifier = this.customer.userId ?? this.customer.consumerNumber ?? '';
    if (!identifier) {
      this.errorMessage = 'Unable to determine user identifier.';
      return;
    }

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
      userId: this.customer.userId
    };

    if (this.newPassword) {
      rawPayload.newPassword = this.newPassword;
      rawPayload.confirmPassword = this.confirmPassword;
    }

    const payload = Object.fromEntries(
      Object.entries(rawPayload).filter(([_, v]) => v !== undefined)
    );

    this.profileService.updateProfile(identifier, payload).subscribe({
      next: () => {
        this.successMessage = 'Customer details updated successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        console.error('Error updating customer:', err);
        this.errorMessage = err?.error?.message || 'Failed to update customer details.';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }
}