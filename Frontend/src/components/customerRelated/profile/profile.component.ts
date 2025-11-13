import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfileService, BackendProfile } from '../../services/profile.service';
import { finalize } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // bind this object to template with [(ngModel)]
  profile: Partial<BackendProfile & { newPassword?: string; confirmPassword?: string }> = {
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    email: '',
    mobile: '',
    customerType: '',
    electricalSection: '',
    userId: '',
    consumerNumber: '',
    newPassword: '',
    confirmPassword: ''
  };

  loading = false;
  error = '';
  saving = false;

  // Replace with actual userId from auth state when available
  private userId = localStorage.getItem('userId') ?? '';

  constructor(private svc: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.error = '';

    this.svc.getProfile(this.userId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          // map backend response into profile object (preserve form field names)
          this.profile = {
            fullName: data.fullName ?? '',
            address: data.address ?? '',
            city: data.city ?? '',
            state: data.state ?? '',
            pincode: data.pincode ?? '',
            email: data.email ?? '',
            mobile: data.mobile ?? '',
            customerType: data.customerType ?? '',
            electricalSection: data.electricalSection ?? '',
            userId: data.userId ?? '',
            consumerNumber: data.consumerNumber ?? '',
            newPassword: '',
            confirmPassword: ''
          };
        },
        error: (err) => {
          console.error('Failed to load profile', err);
          this.error = 'Failed to load profile. Please refresh or try later.';
        }
      });
  }

  get passwordMismatch(): boolean {
    const p = this.profile.newPassword ?? '';
    const cp = this.profile.confirmPassword ?? '';
    return !!(p || cp) && p !== cp;
  }

  saveProfile(): void {
    // basic front-end validation
    if (this.passwordMismatch) {
      alert('New password and confirm password do not match.');
      return;
    }

    // build payload for backend - exclude confirmPassword
    const payload: any = {
      fullName: this.profile.fullName,
      address: this.profile.address,
      city: this.profile.city,
      state: this.profile.state,
      pincode: this.profile.pincode,
      email: this.profile.email,
      mobile: this.profile.mobile,
      customerType: this.profile.customerType,
      electricalSection: this.profile.electricalSection,
      userId:this.userId
      // userId usually not updatable; include if backend expects it
    };

    if (this.profile.newPassword) {
      payload.newPassword = this.profile.newPassword;
      payload.confirmPassword = this.profile.confirmPassword;
    }

    this.saving = true;
    this.error = '';

    this.svc.updateProfile(this.userId, payload)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (res) => {
          alert('Profile updated successfully.');
          // optionally reload or clear password fields
          this.profile.newPassword = '';
          this.profile.confirmPassword = '';
        },
        error: (err) => {
          console.error('Failed to save profile', err);
          this.error = 'Failed to save profile. Please try again.';
        }
      });
  }
}
