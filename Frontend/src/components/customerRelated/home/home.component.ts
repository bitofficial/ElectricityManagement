
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface FeatureCard {
title: string;
description: string;
route: string;
icon: string;
}

interface UserDetails {
fullName: string;
consumerNumber: string;
billingAddress: string;
}

interface BillDetails {
billId?: string;
billingMonth: string;
dueDate: string;
amount: number;
status: string;
}

@Component({
selector: 'app-home',
standalone: true,
imports: [FormsModule, CommonModule, RouterLink, HttpClientModule],
templateUrl: './home.component.html',
styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
user: UserDetails = {
fullName: '',
consumerNumber: '',
billingAddress: '',
};

currentBill: BillDetails | null = null;



consumerNumber: string =
localStorage.getItem('userId')?.toString().substring(2) || '';

features: FeatureCard[] = [
{
title: 'View Bills',
description: 'See and download your recent bills and invoices.',
route: '/customer/view-bill',
icon: 'bi bi-receipt',
},
{
title: 'Pay Bill',
description: 'Make a secure payment online using cards or netbanking.',
route: '/customer/pay-bill',
icon: 'bi bi-credit-card-2-front',
},
{
title: 'Bill History',
description: 'Review your billing history and past payments.',
route: '/customer/bill-history',
icon: 'bi bi-clock-history',
},
{
title: 'Register Complaint',
description: 'Report an issue with your service or bill.',
route: '/customer/register-complaint',
icon: 'bi bi-exclamation-circle',
},
{
title: 'Complaint Status',
description: 'Track the resolution status of your raised complaints.',
route: '/customer/complaint-status',
icon: 'bi bi-list-check',
},
{
title: 'Account Settings',
description: 'Edit contact details, change address and preferences.',
route: '/customer/profile',
icon: 'bi bi-gear',
},
];

constructor(private router: Router, private http: HttpClient) {}

ngOnInit(): void {
this.loadUser(this.consumerNumber);
this.loadCurrentBill(this.consumerNumber);
}

loadUser(consumerNumber: string): void {
this.http
.get<UserDetails>(`http://localhost:8085/api/dashboard/${consumerNumber}`)
.subscribe({
next: (data: UserDetails) => {
this.user = data;
console.log('User Details:', data);
},
error: (error) => {
console.error('Error fetching user details:', error);
},
});
}

loadCurrentBill(consumerNumber: string): void {
this.http
.get<BillDetails[]>(`http://localhost:8085/api/dashboard/${consumerNumber}/bills`)
.subscribe({
next: (bills: BillDetails[]) => {
console.log('Fetched Bills:', bills);

if (bills && bills.length > 0) {

// SORT bills by billing month & year (latest first)
const sortedBills = bills.sort((a, b) => {
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const [aMonth, aYear] = a.billingMonth.split('-');
const [bMonth, bYear] = b.billingMonth.split('-');

const aIndex = months.indexOf(aMonth);
const bIndex = months.indexOf(bMonth);

// Sort by year first (desc), then month (desc)
if (aYear !== bYear) return Number(bYear) - Number(aYear);
return bIndex - aIndex;
});


for(let i in sortedBills){
console.log(sortedBills[i]);
}
this.currentBill = sortedBills.find(bill => bill.status === 'Unpaid') || null;

console.log('Latest Unpaid Bill Selected:', this.currentBill);
} 
else {
console.warn('No bills found for this consumer');
this.currentBill = null;
}
},

error: (error) => {
console.error('Error fetching current bill:', error);
this.currentBill = null;
},
});
}



logout(): void {
localStorage.removeItem('userId');
localStorage.removeItem('UserSession');

// Optional: redirect to home or login page
this.router.navigate(['/']);
}
}
