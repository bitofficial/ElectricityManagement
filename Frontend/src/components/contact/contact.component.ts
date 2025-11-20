import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  phoneNumber: string = "+91-9876543210";
  email: string = "support@powerease.com";
  copied: boolean = false;
    loginStatus = false;
    isAdmin=false;
    isSME=false;

  gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${this.email}`;

constructor(private router: Router) {}

  ngOnInit(): void {
    const uid = localStorage.getItem('userId');
    const aid = localStorage.getItem('adminId');
    const smeId = localStorage.getItem('smeId');
    this.isAdmin=!!aid && aid !== 'undefined' && aid !== 'null';
    this.isSME=!!smeId && smeId!=='undefined' && smeId!='null';
    this.loginStatus = (!!uid && uid !== 'undefined' && uid !== 'null')||(!!aid && aid !== 'undefined' && aid !== 'null');
  }

  logout(): void {
    localStorage.clear();
    this.loginStatus = false;
    // Optional: redirect to home or login page
    this.router.navigate(['/']);
  }

  // Detect mobile device
  isMobile(): boolean {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);
  }

  // Phone click handler
  handlePhoneClick(event: Event): void {
    event.preventDefault();

    if (this.isMobile()) {
      // Mobile → open phone dialer
      window.location.href = `tel:${this.phoneNumber}`;
    } else {
      // Desktop → copy number
      navigator.clipboard.writeText(this.phoneNumber).then(() => {
        this.copied = true;

        // Hide message after 2 seconds
        setTimeout(() => this.copied = false, 2000);
      });
    }
  }
}
