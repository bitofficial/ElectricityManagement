import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sme-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './sme-login.component.html',
  styleUrl: './sme-login.component.css'
})
export class SmeLoginComponent {
smeLoginData = { smeId: '', password: '' };
  successMessage = '';
  errorMessage = '';
  smeLoginStatus = false;
  showPassword: boolean = false;


  constructor(private authService: AuthService, private router: Router) { }


togglePassword() {
  this.showPassword = !this.showPassword;
}


  onLogin(): void {
  console.log('Attempting login with:', this.smeLoginData);

  this.authService.smelogin(this.smeLoginData).subscribe({
    next: (response: any) => {
      console.log('API Response:', response);

      if (response && response.message === 'Login Successful') {
        this.successMessage = 'Logged In successfully !';
        this.errorMessage = '';
        this.smeLoginStatus = true;

        // Save sme session
        localStorage.setItem('smeSession', JSON.stringify(response));
        
        if (response.smeId) {
          localStorage.setItem('smeId', response.smeId);
        }

        setTimeout(() => {
          this.router.navigate(['/sme/home']);
        }, 500);
      } else {
        this.errorMessage = response.message || 'Login failed. Please try again.';
        this.successMessage = '';
        this.smeLoginStatus = false;
      }
    },
    error: (error) => {
      console.error('Login error:', error);
      this.errorMessage = 'Invalid smeId, or password.';
      this.successMessage = '';
    }
  });
}

}
