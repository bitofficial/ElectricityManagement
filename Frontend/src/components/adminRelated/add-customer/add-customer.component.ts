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
    { name: 'Andhra Pradesh', cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati', 'Rajahmundry', 'Kadapa', 'Anantapur', 'Eluru'] },
    { name: 'Arunachal Pradesh', cities: ['Itanagar', 'Naharlagun', 'Tawang', 'Roing', 'Pasighat', 'Ziro', 'Bomdila', 'Tezu', 'Aalo', 'Namsai'] },
    { name: 'Assam', cities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Tezpur', 'Nagaon', 'Tinsukia', 'Sivasagar', 'Karimganj', 'Goalpara'] },
    { name: 'Bihar', cities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnea', 'Darbhanga', 'Arrah', 'Begusarai', 'Katihar', 'Munger'] },
    { name: 'Chhattisgarh', cities: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Mahasamund'] },
    { name: 'Goa', cities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem', 'Sanquelim', 'Valpoi', 'Cuncolim'] },
    { name: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh', 'Anand', 'Navsari'] },
    { name: 'Haryana', cities: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar', 'Karnal', 'Yamunanagar', 'Rohtak', 'Sirsa', 'Kurukshetra'] },
    { name: 'Himachal Pradesh', cities: ['Shimla', 'Dharamshala', 'Mandi', 'Solan', 'Kangra', 'Bilaspur', 'Una', 'Hamirpur', 'Chamba', 'Kullu'] },
    { name: 'Jharkhand', cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Deoghar', 'Giridih', 'Ramgarh', 'Phusro', 'Jhumri Telaiya'] },
    { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi', 'Kalaburagi', 'Davangere', 'Shivamogga', 'Ballari', 'Udupi'] },
    { name: 'Kerala', cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Alappuzha', 'Palakkad', 'Malappuram', 'Kannur', 'Kottayam'] },
    { name: 'Madhya Pradesh', cities: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa'] },
    { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli'] },
    { name: 'Manipur', cities: ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Senapati', 'Ukhrul', 'Kakching', 'Tamenglong', 'Jiribam', 'Moreh'] },
    { name: 'Meghalaya', cities: ['Shillong', 'Tura', 'Nongpoh', 'Jowai', 'Baghmara', 'Williamnagar', 'Mairang', 'Resubelpara', 'Khliehriat', 'Nongstoin'] },
    { name: 'Mizoram', cities: ['Aizawl', 'Lunglei', 'Saiha', 'Serchhip', 'Kolasib', 'Champhai', 'Mamit', 'Lawngtlai', 'Bairabi', 'Hnahthial'] },
    { name: 'Nagaland', cities: ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Mon', 'Phek', 'Kiphire', 'Longleng'] },
    { name: 'Odisha', cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Balasore', 'Puri', 'Jeypore', 'Baripada', 'Jharsuguda'] },
    { name: 'Punjab', cities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Pathankot', 'Hoshiarpur', 'Moga', 'Firozpur'] },
    { name: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Ajmer', 'Bikaner', 'Alwar', 'Sikar', 'Bhilwara', 'Pali'] },
    { name: 'Sikkim', cities: ['Gangtok', 'Namchi', 'Mangan', 'Geyzing', 'Singtam', 'Rangpo', 'Jorethang', 'Ravangla', 'Soreng', 'Yuksom'] },
    { name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Tirunelveli', 'Salem', 'Vellore', 'Erode', 'Dindigul', 'Thoothukudi'] },
    { name: 'Telangana', cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar', 'Adilabad', 'Suryapet', 'Miryalaguda'] },
    { name: 'Tripura', cities: ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailasahar', 'Belonia', 'Ambassa', 'Khowai', 'Sonamura', 'Ranirbazar', 'Kamalpur'] },
    { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Agra', 'Ghaziabad', 'Noida', 'Meerut', 'Bareilly', 'Aligarh'] },
    { name: 'Uttarakhand', cities: ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rishikesh', 'Kashipur', 'Rudrapur', 'Nainital', 'Pithoragarh', 'Mussoorie'] },
    { name: 'West Bengal', cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda', 'Kharagpur', 'Berhampore', 'Haldia'] },

    // -------------------- UNION TERRITORIES ---------------------

    { name: 'Andaman and Nicobar Islands', cities: ['Port Blair', 'Rangat', 'Diglipur', 'Mayabunder', 'Hut Bay', 'Neil Island', 'Havelock', 'Car Nicobar', 'Campbell Bay', 'Bambooflat'] },
    { name: 'Chandigarh', cities: ['Chandigarh', 'Manimajra', 'Sector 17', 'Sector 22', 'Sector 43', 'Dhanas', 'Burail', 'Sarangpur', 'Maloya', 'Khuda Lahora'] },
    { name: 'Dadra and Nagar Haveli and Daman and Diu', cities: ['Silvassa', 'Daman', 'Diu', 'Naroli', 'Samarvarni', 'Varkund', 'Kadaiya', 'Athola', 'Kachigam', 'Moti Daman'] },
    { name: 'Delhi', cities: ['New Delhi', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh', 'Vasant Kunj', 'Lajpat Nagar', 'Mayur Vihar', 'Connaught Place', 'Pitampura'] },
    { name: 'Jammu and Kashmir', cities: ['Srinagar', 'Jammu', 'Udhampur', 'Anantnag', 'Baramulla', 'Kathua', 'Sopore', 'Kupwara', 'Rajouri', 'Poonch'] },
    { name: 'Ladakh', cities: ['Leh', 'Kargil', 'Diskit', 'Padum', 'Nubra Valley', 'Shey', 'Choglamsar', 'Sakti', 'Hemis', 'Turtuk'] },
    { name: 'Lakshadweep', cities: ['Kavaratti', 'Agatti', 'Minicoy', 'Amini', 'Kadmat', 'Kalpeni', 'Andrott', 'Chetlat', 'Bitra', 'Kiltan'] },
    { name: 'Puducherry', cities: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam', 'Ozhukarai', 'Villiyanur', 'Bahour', 'Mangalam', 'Kottucherry', 'T.R. Pattinam'] }
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

          // Set state & city from pincode API
          this.user.state = postOffice.State;
          this.user.city = postOffice.District;

          // Update cities based on the detected state
          const matchState = this.states.find(s => s.name === this.user.state);
          this.cities = matchState ? [...matchState.cities] : [];

          // If city from API is not in the list, add it
          if (!this.cities.includes(this.user.city)) {
            this.cities.push(this.user.city);
          }
        }
      },
      error: (err) => console.error('Error fetching location', err)
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
