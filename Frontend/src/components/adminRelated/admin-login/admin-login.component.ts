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
  adminLoginData = { adminId: '',email:'null@null.com', password: '' };
  successMessage = '';
  errorMessage = '';
  adminLoginStatus = false;

  constructor(private authService: AuthService, private router: Router) { }
  
  onLogin(): void {
  console.log('Attempting login with:', this.adminLoginData);

  this.authService.adminlogin(this.adminLoginData).subscribe({
    next: (response: any) => {
      console.log('API Response:', response);

      if (response && response.message === 'Admin login successful') {
        this.successMessage = 'Login successful!';
        this.errorMessage = '';
        this.adminLoginStatus = true;

        // Save admin session
        localStorage.setItem('AdminSession', JSON.stringify(response));
        
        if (response.adminId) {
          localStorage.setItem('adminId', response.adminId);
        }

        setTimeout(() => {
          this.router.navigate(['/admin/home']);
        }, 500);
      } else {
        this.errorMessage = response.message || 'Login failed. Please try again.';
        this.successMessage = '';
        this.adminLoginStatus = false;
      }
    },
    error: (error) => {
      console.error('Login error:', error);
      this.errorMessage = 'Invalid adminId or password.';
      this.successMessage = '';
    }
  });
}

}

