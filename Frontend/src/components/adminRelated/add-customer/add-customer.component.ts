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

  // user model
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

  // optional lists (if you use them elsewhere)
  states: { name: string, cities: string[] }[] = [];
  cities: string[] = [];

  successMessage = '';
  errorMessage = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private addCustomerService: AddCustomerService
  ) {}

  // kept in case you still want to populate cities when using select -> input no longer calls this
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
        if (info && info.Status === 'Success' && info.PostOffice && info.PostOffice.length) {
          const postOffice = info.PostOffice[0];

          // Set state & city from pincode API (these will populate the text inputs)
          this.user.state = postOffice.State || this.user.state;
          this.user.city = postOffice.District || this.user.city;

          // Update cities list if you want to use it elsewhere
          const matchState = this.states.find(s => s.name === this.user.state);
          this.cities = matchState ? [...matchState.cities] : [];

          // ensure city is present in cities list
          if (this.user.city && !this.cities.includes(this.user.city)) {
            this.cities.push(this.user.city);
          }
        }
      },
      error: (err) => console.error('Error fetching location', err)
    });
  }

  generateConsumerNo(): void {
    const url =
      'https://www.random.org/integers/?num=1&min=100000000&max=999999999&col=1&base=10&format=plain&rnd=new';
    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (res: string) => {
        const first9 = res.trim();
        const last4 = Math.floor(1000 + Math.random() * 9000).toString();
        this.user.consumerNumber = first9 + last4;
      },

      error: (err) => {
        console.error('Error generating consumer number', err);
        this.user.consumerNumber =
          (Math.floor(1000000000000 + Math.random() * 9000000000000)).toString();
      }
    });
  }

  addCustomer(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // Hard Validation in TypeScript also
    if (!/^(?!0{13})([1-9][0-9]{12})$/.test(this.user.consumerNumber)) {
      this.errorMessage = "Invalid consumer number.";
      return;
    }

    if (!/^[6-9][0-9]{9}$/.test(this.user.mobile)) {
      this.errorMessage = "Invalid 10-digit phone number.";
      return;
    }

    if (!/^[1-9][0-9]{5}$/.test(this.user.pincode)) {
      this.errorMessage = "Invalid 6-digit pincode.";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email)) {
      this.errorMessage = "Invalid email format.";
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$/.test(this.user.password)) {
      this.errorMessage = "Password must contain letters and numbers.";
      return;
    }

    this.user.userId = 'N-' + this.user.consumerNumber;
    this.user.city= this.user.city.toUpperCase();
    this.user.state= this.user.state.toUpperCase();
    
    this.addCustomerService.addCustomer(this.user).subscribe({
      next: () => {
        this.successMessage = 'Customer added successfully!';
        this.errorMessage = '';
        // reset form model
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
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
          this.router.navigate(['/admin/add-customer']);
        }, 3000);
      },
      error: (err) => {
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
        }, 3000);
        console.error('Error adding customer:', err);
        this.errorMessage = 'Failed to add customer. Please try again.';
      }
    });
  }
}
