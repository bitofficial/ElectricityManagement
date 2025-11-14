import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = {
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
    confirmPassword: '',
  };

  firstPassword: string = '';
  isPasswordVerified: boolean = false;  // ⭐ NEW FLAG

  errorMessage: string = '';
  isLoading: boolean = false;
  showUserIdModal: boolean = false;
  showErrorIdModal: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  copyUserId(): void {
    if (this.user.userId) {
      navigator.clipboard.writeText(this.user.userId);
      alert('User ID copied!');
    }
  }

  // ⭐ FIRST LOGIN PASSWORD VERIFICATION
  verifyPass(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.user.userId) {
      const consumer = (this.user.consumerNumber || '').trim();
      if (consumer) {
        this.user.userId = 'u-' + consumer;
      } else {
        this.errorMessage = 'Please enter consumer number first.';
        return;
      }
    }

    this.authService.login({ userId: this.user.userId, password: this.firstPassword }).subscribe({
      next: () => {
        this.errorMessage = '';
        this.isPasswordVerified = true; // ⭐ ENABLE PASSWORD CREATION
        alert('Password Verified Successfully!');
      },
      error: (error) => {
        this.isPasswordVerified = false; // keep disabled
        if (error?.status === 401) {
          this.errorMessage = 'Incorrect password. Please try again.';
        } else {
          this.errorMessage = 'Verification failed. Please try again.';
        }
      }
    });
  }

  goToLogin(): void {
    this.showUserIdModal = false;
    this.router.navigate(['/login']);
  }

  registerAgain(): void {
    this.router.navigate(['/register']);
  }

  // ⭐ REGISTER NEW USER
  registerUser(): void {
    this.errorMessage = '';
    this.isLoading = true;

    const consumer = (this.user.consumerNumber || '').trim();
    if (!consumer) {
      this.isLoading = false;
      this.errorMessage = 'Consumer number is required.';
      this.showErrorIdModal = true;
      return;
    }

    this.user.userId = 'u-' + consumer;

    const payload: any = {
      fullName: this.user.fullName,
      address: this.user.address,
      city: this.user.city,
      state: this.user.state,
      pincode: this.user.pincode,
      email: this.user.email,
      mobile: this.user.mobile,
      customerType: this.user.customerType,
      electricalSection: this.user.electricalSection,
      userId: this.user.userId,
      consumerNumber: this.user.consumerNumber
    };

    if (this.user.newPassword) {
      payload.newPassword = this.user.newPassword;
      payload.confirmPassword = this.user.confirmPassword ?? '';
    }

    this.profileService.updateProfile(this.user.userId, payload)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.showUserIdModal = true;
          this.showErrorIdModal = false;
          this.errorMessage = '';
        },
        error: (err) => {
          this.showUserIdModal = false;
          this.showErrorIdModal = true;
          if (err?.status === 409) {
            this.errorMessage = 'User already exists!';
          } else {
            this.errorMessage = 'Registration failed.';
          }
        }
      });
  }

  // ⭐ FETCH EXISTING USER DETAILS
  fetchUserDetails(): void {
    this.errorMessage = '';

    const consumerId = (this.user.consumerNumber || '').trim();
    if (!consumerId) {
      this.errorMessage = 'Enter consumer number to fetch details.';
      return;
    }

    this.isLoading = true;
    const url = `http://localhost:8085/api/register/getbyid/${'u-' + encodeURIComponent(consumerId)}`;

    this.http.get<any>(url).pipe(
      finalize(() => (this.isLoading = false))
    ).subscribe({
      next: (res) => {
        if (!res) {
          this.errorMessage = 'Invalid response.';
          return;
        }

        this.user.fullName = res.fullName ?? this.user.fullName;
        this.user.address = res.address ?? this.user.address;
        this.user.city = res.city ?? this.user.city;
        this.user.state = res.state ?? this.user.state;
        this.user.pincode = res.pincode ?? this.user.pincode;
        this.user.email = res.email ?? this.user.email;
        this.user.mobile = res.mobile ?? this.user.mobile;
        this.user.customerType = res.customerType ?? this.user.customerType;
        this.user.electricalSection = res.electricalSection ?? this.user.electricalSection;
        this.user.userId = res.userId ?? this.user.userId;

        this.errorMessage = '';
      },
      error: (err) => {
        if (err?.status === 404) {
          this.errorMessage = 'No record found.';
        } else {
          this.errorMessage = 'Failed to fetch details.';
        }
      }
    });
  }
}
