import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  role = 'EMPLOYEE'; // default role

  errorMsg = '';
  successMsg = '';

  constructor(private http: HttpClient, private router: Router) {}

  signup() {
    this.errorMsg = '';
    this.successMsg = '';

    const payload = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
    };

    this.http.post('http://localhost:8080/api/auth/signup', payload)
      .subscribe({
        next: () => {
          this.successMsg = 'Signup successful! You can now login.';
          // Optionally redirect to login
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: err => {
          this.errorMsg = err.error?.message || 'Signup failed. Try again.';
        }
      });
  }
}
