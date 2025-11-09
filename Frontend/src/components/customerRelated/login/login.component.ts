import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // adjust path if needed

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.successMessage = 'Login successful!';
        this.errorMessage = '';
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password.';
        this.successMessage = '';
      }
    });
  }
}
