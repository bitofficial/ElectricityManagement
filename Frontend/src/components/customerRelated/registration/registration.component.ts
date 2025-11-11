// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-registration',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.css']
// })
// export class RegistrationComponent {
//   user = {
//     consumerNumber: '',
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     pincode: '',
//     city: '',
//     state: '',
//     mobile: '',
//     customerType: '',
//     electricalSection: '',
//     userId: '',
//     address: '',
//   };

//   passMessage: string = '';
//   errorMessage: string = '';
//   successMessage: string = '';
//   passwordMismatch: boolean = false;

//   cities: string[] = [];

//   states = [
//     { name: 'Andhra Pradesh', cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Anantapur', 'Kadapa', 'Eluru'] },
//     { name: 'Delhi', cities: ['New Delhi', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh', 'Vasant Kunj', 'Lajpat Nagar', 'Connaught Place', 'Mayur Vihar', 'Pitampura'] },
//     { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli'] },
//     { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Ghaziabad', 'Noida', 'Agra', 'Meerut', 'Bareilly', 'Aligarh'] },
//     { name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul'] },
//     { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangalore', 'Hubballi', 'Belagavi', 'Kalaburagi', 'Davangere', 'Shivamogga', 'Tumakuru', 'Ballari'] },
//   ];

//   constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

//   onStateChange(): void {
//     const selected = this.states.find(s => s.name === this.user.state);
//     this.cities = selected ? selected.cities : [];
//     this.user.city = '';
//   }

//   fetchLocationByPincode(): void {
//     const pincode = this.user.pincode;
//     if (!pincode || pincode.length !== 6) return;

//     this.http.get<any[]>(`https://api.postalpincode.in/pincode/${pincode}`).subscribe({
//       next: (res) => {
//         const info = res[0];
//         if (info.Status === 'Success') {
//           const postOffice = info.PostOffice[0];
//           this.user.city = postOffice.District;
//           this.user.state = postOffice.State;
//           this.onStateChange();
//           if (!this.cities.includes(this.user.city)) {
//             this.cities.push(this.user.city);
//           }
//         }
//       },
//       error: (err) => console.error('Error fetching location', err)
//     });
//   }

//   /** ✅ Real-time password match check */
//   validatePasswords(): void {
//     this.passwordMismatch = this.user.password !== this.user.confirmPassword;
//   }

//   /** ✅ Utility validators */
//   private isOnlyZeros(value: string): boolean {
//     return /^0+$/.test(value.trim());
//   }

//   private isValidName(value: string): boolean {
//     return /^[A-Za-z ]+$/.test(value.trim());
//   }

//   private isValidEmail(value: string): boolean {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
//   }

//   private isValidConsumerNumber(value: string): boolean {
//     return /^[1-9][0-9]{12}$/.test(value.trim());
//   }

//   private isValidMobile(value: string): boolean {
//     return /^(?!([0-9])\1{9})[6-9][0-9]{9}$/.test(value.trim());
//   }

//   /** ✅ Address validation (no zeros, not numeric-only, minimum 5 chars) */
//   private isValidAddress(value: string): boolean {
//     if (!value || value.trim().length < 5) return false;
//     if (/^0+$/.test(value.trim())) return false;
//     if (/^[0-9\s]+$/.test(value.trim())) return false;
//     return /^[a-zA-Z0-9\s,./#'-]+$/.test(value.trim());
//   }

//   /** ✅ Registration logic with validations */
//   registerUser(): void {
//     this.errorMessage = '';
//     this.successMessage = '';

//     // Empty field check
//     if (!this.user.fullName || !this.user.email || !this.user.password || !this.user.confirmPassword) {
//       this.errorMessage = 'Please fill in all required fields.';
//       return;
//     }

//     // Field-level validations
//     if (!this.isValidName(this.user.fullName)) {
//       this.errorMessage = 'Full Name must contain only alphabets.';
//       return;
//     }

//     if (!this.isValidEmail(this.user.email)) {
//       this.errorMessage = 'Please enter a valid email address.';
//       return;
//     }

//     if (!this.isValidConsumerNumber(this.user.consumerNumber)) {
//       this.errorMessage = 'Consumer number must be exactly 13 digits and cannot start with 0.';
//       return;
//     }

//     if (!this.isValidMobile(this.user.mobile)) {
//       this.errorMessage = 'Enter a valid 10-digit phone number (not repetitive).';
//       return;
//     }

//     if (this.isOnlyZeros(this.user.pincode) || this.isOnlyZeros(this.user.consumerNumber)) {
//       this.errorMessage = 'Fields cannot contain only zeros.';
//       return;
//     }

//     // ✅ Fixed — proper address validation call
//     if (!this.isValidAddress(this.user.address)) {
//       this.errorMessage = 'Please enter a valid address (cannot be only zeros, numeric, or too short).';
//       return;
//     }

//     if (this.user.password !== this.user.confirmPassword) {
//       this.errorMessage = 'Passwords do not match.';
//       return;
//     }

//     // Generate user ID
//     this.user.userId = 'u-' + this.user.consumerNumber;

//     // ✅ API call
//     this.authService.register(this.user).subscribe({
//       next: () => {
//         this.successMessage = 'Registration successful! Redirecting to login...';
//         setTimeout(() => this.router.navigate(['/login']), 2000);
//       },
//       error: (err) => {
//         console.error('Registration failed:', err);
//         this.errorMessage = err?.error?.message || 'Registration failed. Please try again.';
//       }
//     });
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = {
    consumerNumber: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    pincode: '',
    city: '',
    state: '',
    mobile: '',
    customerType: '',
    electricalSection: '',
    userId: '',
    address: '',
  };

  passMessage: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  passwordMismatch: boolean = false;
  isLoading: boolean = false; // ✅ added for button loading state

  cities: string[] = [];

  states = [
    { name: 'Andhra Pradesh', cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Anantapur', 'Kadapa', 'Eluru'] },
    { name: 'Delhi', cities: ['New Delhi', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh', 'Vasant Kunj', 'Lajpat Nagar', 'Connaught Place', 'Mayur Vihar', 'Pitampura'] },
    { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli'] },
    { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Ghaziabad', 'Noida', 'Agra', 'Meerut', 'Bareilly', 'Aligarh'] },
    { name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul'] },
    { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangalore', 'Hubballi', 'Belagavi', 'Kalaburagi', 'Davangere', 'Shivamogga', 'Tumakuru', 'Ballari'] },
  ];

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  onStateChange(): void {
    const selected = this.states.find(s => s.name === this.user.state);
    this.cities = selected ? selected.cities : [];
    this.user.city = '';
  }

  fetchLocationByPincode(): void {
    const pincode = this.user.pincode;
    if (!pincode || pincode.length !== 6) return;

    this.http.get<any[]>(`https://api.postalpincode.in/pincode/${pincode}`).subscribe({
      next: (res) => {
        const info = res[0];
        if (info.Status === 'Success') {
          const postOffice = info.PostOffice[0];
          this.user.city = postOffice.District;
          this.user.state = postOffice.State;
          this.onStateChange();
          if (!this.cities.includes(this.user.city)) {
            this.cities.push(this.user.city);
          }
        }
      },
      error: (err) => console.error('Error fetching location', err)
    });
  }

  /** ✅ Real-time password match check */
  validatePasswords(): void {
    this.passwordMismatch = this.user.password !== this.user.confirmPassword;
  }

  /** ✅ Utility validators */
  private isOnlyZeros(value: string): boolean {
    return /^0+$/.test(value.trim());
  }

  private isValidName(value: string): boolean {
    return /^[A-Za-z ]+$/.test(value.trim());
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  private isValidConsumerNumber(value: string): boolean {
    return /^[1-9][0-9]{12}$/.test(value.trim());
  }

  private isValidMobile(value: string): boolean {
    return /^(?!([0-9])\1{9})[6-9][0-9]{9}$/.test(value.trim());
  }

  /** ✅ Address validation (no zeros, not numeric-only, minimum 5 chars) */
  private isValidAddress(value: string): boolean {
    if (!value || value.trim().length < 5) return false;
    if (/^0+$/.test(value.trim())) return false;
    if (/^[0-9\s]+$/.test(value.trim())) return false;
    return /^[a-zA-Z0-9\s,./#'-]+$/.test(value.trim());
  }

  /** ✅ Registration logic with validations */
  registerUser(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Empty field check
    if (!this.user.fullName || !this.user.email || !this.user.password || !this.user.confirmPassword) {
      this.errorMessage = 'Please fill in all required fields.';
      this.isLoading = false;
      return;
    }

    // Field-level validations
    if (!this.isValidName(this.user.fullName)) {
      this.errorMessage = 'Full Name must contain only alphabets.';
      this.isLoading = false;
      return;
    }

    if (!this.isValidEmail(this.user.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      this.isLoading = false;
      return;
    }

    if (!this.isValidConsumerNumber(this.user.consumerNumber)) {
      this.errorMessage = 'Consumer number must be exactly 13 digits and cannot start with 0.';
      this.isLoading = false;
      return;
    }

    if (!this.isValidMobile(this.user.mobile)) {
      this.errorMessage = 'Enter a valid 10-digit phone number (not repetitive).';
      this.isLoading = false;
      return;
    }

    if (this.isOnlyZeros(this.user.pincode) || this.isOnlyZeros(this.user.consumerNumber)) {
      this.errorMessage = 'Fields cannot contain only zeros.';
      this.isLoading = false;
      return;
    }

    if (!this.isValidAddress(this.user.address)) {
      this.errorMessage = 'Please enter a valid address (cannot be only zeros, numeric, or too short).';
      this.isLoading = false;
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.isLoading = false;
      return;
    }

    // Generate user ID
    this.user.userId = 'u-' + this.user.consumerNumber;

    // ✅ API call
    this.authService.register(this.user).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.isLoading = false;

        // ✅ Improved backend-aware error handling
        if (err.status === 409 || err.status === 400) {
          // backend JSON error message (e.g. { "message": "Consumer number already exists." })
          this.errorMessage = err.error?.message || 'Consumer number already exists.';
        } else if (err.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please try again later.';
        } else {
          this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        }
      }
    });
  }
}
