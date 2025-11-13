// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router, RouterLink } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { AddCustomerService } from '../../services/add-customer.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-add-customer',
//   standalone: true,
//   imports: [FormsModule, CommonModule, RouterLink],
//   templateUrl: './add-customer.component.html',
//   styleUrls: ['./add-customer.component.css']
// })
// export class AddCustomerComponent {

//   // --------------------------
//   // User Form Model
//   // --------------------------
//   user = {
//     consumerNumber: "",
//     fullName: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     email: "",
//     mobile: "",
//     customerType: "",
//     electricalSection: "",
//     userId: "",
//     password: ""
//   };

//   successMessage: string = '';
//   errorMessage: string = '';

//   // --------------------------
//   // Dropdown Data
//   // --------------------------
//   cities: string[] = [];

//   states = [
//     { name: 'Andhra Pradesh', cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Anantapur', 'Kadapa', 'Eluru'] },
//     { name: 'Delhi', cities: ['New Delhi', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh', 'Vasant Kunj', 'Lajpat Nagar', 'Connaught Place', 'Mayur Vihar', 'Pitampura'] },
//     { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli'] },
//     { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Ghaziabad', 'Noida', 'Agra', 'Meerut', 'Bareilly', 'Aligarh'] },
//     { name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul'] },
//     { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangalore', 'Hubballi', 'Belagavi', 'Kalaburagi', 'Davangere', 'Shivamogga', 'Tumakuru', 'Ballari'] },
//   ];

//   // --------------------------
//   // Constructor (Dependencies)
//   // --------------------------
//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private http: HttpClient,
//     private addCustomerService: AddCustomerService
//   ) {}

//   // --------------------------
//   // State Dropdown Handler
//   // --------------------------
//   onStateChange(): void {
//     const selected = this.states.find(s => s.name === this.user.state);
//     this.cities = selected ? selected.cities : [];
//     this.user.city = '';
//   }

//   // --------------------------
//   // Auto-Fetch Location by Pincode
//   // --------------------------
//   fetchLocationByPincode(): void {
//     const pincode = this.user.pincode;
//     if (!pincode || pincode.length !== 6) return;

//     this.http.get<any[]>(`https://api.postalpincode.in/pincode/${pincode}`).subscribe({
//       next: (res: any[]) => {
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
//       error: (err: any) => console.error('Error fetching location', err)
//     });
//   }

//   // --------------------------
//   // Add Customer Method
//   // --------------------------
//   addCustomer(): void {
//     this.successMessage = '';
//     this.errorMessage = '';
//     this.user.userId='u-'+this.user.consumerNumber;
//     this.addCustomerService.addCustomer(this.user).subscribe({
//       next: (response) => {
//         this.successMessage = 'Customer added successfully!';
//         this.user = {
//           consumerNumber: "",
//           fullName: "",
//           address: "",
//           city: "",
//           state: "",
//           pincode: "",
//           email: "",
//           mobile: "",
//           customerType: "",
//           electricalSection: "",
//           userId: "",
//           password: ""
//         };
//       },
//       error: (err) => {
//         console.error('Error adding customer:', err);
//         this.errorMessage = 'Failed to add customer. Please try again.';
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AddCustomerService } from '../../services/add-customer.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  user = {
    consumerNumber: '',
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
    password: ''
  };

  successMessage = '';
  errorMessage = '';

  cities: string[] = [];

  states = [
    { name: 'Andhra Pradesh', cities: ['Visakhapatnam', 'Vijayawada', 'Guntur'] },
    { name: 'Delhi', cities: ['New Delhi', 'Dwarka', 'Rohini'] },
    { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'] },
    { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi'] },
    { name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai'] },
    { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangalore'] }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private addCustomerService: AddCustomerService
  ) {}

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
          if (!this.cities.includes(this.user.city)) this.cities.push(this.user.city);
        }
      },
      error: (err) => console.error('Error fetching location', err)
    });
  }

  addCustomer(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // Basic front-end validation
    if (!this.user.fullName || !this.user.consumerNumber || !this.user.email) {
      this.errorMessage = 'Please fill all mandatory fields.';
      return;
    }

    this.user.userId = 'u-' + this.user.consumerNumber;

    this.addCustomerService.addCustomer(this.user).subscribe({
      next: () => {
        this.successMessage = 'Customer added successfully!';
        this.errorMessage = '';
        this.user = {
          consumerNumber: '',
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
          password: ''
        };
      },
      error: (err) => {
        console.error('Error adding customer:', err);
        this.errorMessage = 'Failed to add customer. Please try again.';
      }
    });
  }
}
