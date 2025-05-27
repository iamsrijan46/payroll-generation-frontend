import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../AuthService/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        // Save token or navigate
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.error = 'Invalid credentials';
      },
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
