import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from '../customerRelated/registration/registration.component';
import { LoginComponent } from '../customerRelated/login/login.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule,LoginComponent, RegistrationComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    // placeholder for potential initialization (analytics, prefetch, etc.)
  }
}
