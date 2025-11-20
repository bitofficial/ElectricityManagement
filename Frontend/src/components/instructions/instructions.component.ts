import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent {

    loginStatus = false;
  isAdmin=false;
  isSME=false;

  constructor(private router: Router) {}
  
    ngOnInit(): void {
      const uid = localStorage.getItem('userId');
      const aid = localStorage.getItem('adminId');
      const smeId = localStorage.getItem('smeId');
      this.isAdmin=!!aid && aid !== 'undefined' && aid !== 'null';
      this.isSME=!!smeId && smeId!=='undefined' && smeId!='null';
      this.loginStatus = (!!uid && uid !== 'undefined' && uid !== 'null')||(!!aid && aid !== 'undefined' && aid !== 'null');
    }
  
    logout(): void {
      localStorage.clear();
      this.loginStatus = false;
      // Optional: redirect to home or login page
      this.router.navigate(['/']);
    }
}
