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
  adminLoginData = { userId: '', password: '' };
  successMessage = '';
  errorMessage = '';
  adminLoginStatus = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    console.log('Attempting login with:', this.adminLoginData);

    this.authService.login(this.adminLoginData).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        // ✅ Handle API success directly
        if (response && response.message === 'Login Successful') {
          this.successMessage = 'Login successful!';
          this.errorMessage = '';
          this.adminLoginStatus = true;

           localStorage.setItem('AdminSession', JSON.stringify(response));

          // If API sends token or userId, store them separately
          if (response.userId) {
            localStorage.setItem('email', response.userId);
          }
          if (response.token) {
            localStorage.setItem('token', response.token);
          }

          setTimeout(() => {this.router.navigate(['/admin/home']);
          });
        } else {
          this.errorMessage = response.message || 'Login failed. Please try again.';
          this.successMessage = '';
          this.adminLoginStatus = false;
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email or password.';
        this.successMessage = '';
      }
    });
  }
}

