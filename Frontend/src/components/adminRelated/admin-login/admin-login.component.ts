import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  loginData = { userId: '', password: '' };
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        // ✅ Handle API success directly
        if (response && response.message === 'Login successful') {
          this.successMessage = 'Login successful!';
          this.errorMessage = '';
          this.router.navigate(['/admin/add-customer']);
        } else {
          this.errorMessage = response.message || 'Login failed. Please try again.';
          this.successMessage = '';
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid userId or password.';
        this.successMessage = '';
      }
    });
  }
}

