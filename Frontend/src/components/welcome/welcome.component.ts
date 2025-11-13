import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RegistrationComponent } from '../customerRelated/registration/registration.component';
import { LoginComponent } from '../customerRelated/login/login.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent, RegistrationComponent, FormsModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  loginStatus = false;
  currentYear: number = new Date().getFullYear();

  constructor(private router: Router) {}

  ngOnInit(): void {
    const uid = localStorage.getItem('userId');
    this.loginStatus = !!uid && uid !== 'undefined' && uid !== 'null';
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('UserSession');
    this.loginStatus = false;

    // Optional: redirect to home or login page
    this.router.navigate(['/']);
  }
}