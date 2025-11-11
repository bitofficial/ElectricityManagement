import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { userId: '', password: '' };
  successMessage = '';
  errorMessage = '';
  loginStatus = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    console.log('Attempting login with:', this.loginData);

    this.authService.login(this.loginData).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        // ✅ Check for successful login (adjust key names based on your backend)
        if (response && (response.message === 'Login Successful' || response.status === 'success')) {
          this.successMessage = 'Login Successful!';
          this.errorMessage = '';
          this.loginStatus = true;

          // ✅ Store useful session data properly
          localStorage.setItem('UserSession', JSON.stringify(response));

          // If API sends token or userId, store them separately
          if (response.userId) {
            localStorage.setItem('userId', response.userId);
          }
          if (response.token) {
            localStorage.setItem('token', response.token);
          }

          // ✅ Navigate to home
          setTimeout(() => {
            this.router.navigate(['/customer/home']);
          }, 500);
        } else {
          this.errorMessage = response?.message || 'Invalid credentials';
          this.successMessage = '';
          this.loginStatus = false;
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid User ID or Password.';
        this.successMessage = '';
        this.loginStatus = false;
      }
    });
  }
}