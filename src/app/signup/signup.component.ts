import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../AuthService/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private router: Router, private authService: AuthService) {}

  signup() {
    this.authService.signup(this.username, this.email, this.password).subscribe({
      next: (res) => {
        console.log('Signup success:', res);
        this.success = 'Signup successful! Please login.';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err) => {
        console.error('Signup failed', err);
        this.error = 'Signup failed. Try again.';
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
