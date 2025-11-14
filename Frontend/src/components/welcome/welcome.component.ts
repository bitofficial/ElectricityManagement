import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { RegistrationComponent } from '../customerRelated/registration/registration.component';
import { LoginComponent } from '../customerRelated/login/login.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink, LoginComponent, RegistrationComponent, FormsModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  loginStatus = false;
  isAdmin=false;
  currentYear: number = new Date().getFullYear();

  constructor(private router: Router) {}

  ngOnInit(): void {
    const uid = localStorage.getItem('userId');
    const aid = localStorage.getItem('adminId');
    this.isAdmin=!!aid && aid !== 'undefined' && aid !== 'null';
    this.loginStatus = (!!uid && uid !== 'undefined' && uid !== 'null')||(!!aid && aid !== 'undefined' && aid !== 'null');
  }

  logout(): void {
    localStorage.clear();
    this.loginStatus = false;
    // Optional: redirect to home or login page
    this.router.navigate(['/']);
  }
}