import { Component } from '@angular/core';
import { LoginComponent } from '../customerRelated/login/login.component';
import { RegistrationComponent } from '../customerRelated/registration/registration.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [LoginComponent,RegistrationComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
