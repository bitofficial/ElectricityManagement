import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
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
  @ViewChild('regForm') regForm?: NgForm;

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
  isRegistered: boolean = false;

  firstPassword: string = '';
  isPasswordVerified: boolean = false;

  errorMessage: string = '';
  isLoading: boolean = false;
  showUserIdModal: boolean = false;
  showErrorIdModal: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private profileService: ProfileService,
  ) {}

  copyUserId(): void {
    if (this.user.userId) {
      navigator.clipboard.writeText(this.user.userId);
      alert('User ID copied!');
    }
  }

  // check both are non-empty and equal
  passwordsMatch(): boolean {
    return !!(this.user.newPassword && this.user.confirmPassword && this.user.newPassword === this.user.confirmPassword);
  }

  // FIRST LOGIN PASSWORD VERIFICATION
  verifyPass(): void {
    this.errorMessage = '';

    const consumer = (this.user.consumerNumber || '').trim();
    if (!consumer) {
      this.errorMessage = 'Please enter consumer number first.';
      return;
    }

    if (!this.firstPassword) {
      this.errorMessage = 'Enter first login password to verify.';
      return;
    }

    // ensure userId exists (server expects it maybe)
    this.user.userId = 'u-' + consumer;

    this.authService.verifyPass({ consumerNumber: consumer, password: this.firstPassword }).subscribe({
      next: () => {
        this.errorMessage = '';
        this.isPasswordVerified = true;
        // optionally clear firstPassword for security
        // this.firstPassword = '';
        alert('Password Verified Successfully!');
      },
      error: (error: any) => {
        this.isPasswordVerified = false;
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

  // REGISTER NEW USER
  registerUser(form?: NgForm): void {
    this.errorMessage = '';
    // mark form as submitted to show errors
    if (form) {
      form.control.markAllAsTouched();
    }

    const consumer = (this.user.consumerNumber || '').trim();
    if (!consumer) {
      this.errorMessage = 'Consumer number is required.';
      this.showErrorIdModal = true;
      return;
    }

    if (!this.isPasswordVerified) {
      this.errorMessage = 'Please verify the first-login password before creating a new password.';
      return;
    }

    if (!this.user.newPassword || !this.user.confirmPassword) {
      this.errorMessage = 'Please enter a new password and confirm it.';
      return;
    }

    if (!this.passwordsMatch()) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // create userId
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
      consumerNumber: this.user.consumerNumber,
      newPassword: this.user.newPassword,
      confirmPassword: this.user.confirmPassword
    };

    this.isLoading = true;
    this.profileService.updateProfile(this.user.userId, payload)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.showUserIdModal = true;
          this.showErrorIdModal = false;
          this.errorMessage = '';
        },
        error: (err: any) => {
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

  // FETCH EXISTING USER DETAILS
  fetchUserDetails(): void {
    this.errorMessage = '';

    const consumerId = (this.user.consumerNumber || '').trim();
    if (!consumerId) {
      this.errorMessage = 'Enter consumer number to fetch details.';
      return;
    }

    this.isLoading = true;
    const url = `http://localhost:8085/api/admin/users/by-customer/${encodeURIComponent(consumerId)}`;

    this.http.get<any>(url).pipe(
      finalize(() => (this.isLoading = false))
    ).subscribe({
      next: (res: any) => {
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

        // safe check for userId: if starts with 'N' treat as not-registered (your original logic)
        if (this.user.userId && this.user.userId.length > 0) {
          this.isRegistered = !(this.user.userId[0] === 'N');
        } else {
          this.isRegistered = false;
        }
      },
      error: (err: any) => {
        if (err?.status === 404) {
          this.errorMessage = 'No record found.';
        } else {
          this.errorMessage = 'Failed to fetch details.';
        }
      }
    });
  }
}
