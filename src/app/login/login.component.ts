import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const loginData = { username: this.username, password: this.password };

    this.http.post<any>('http://localhost:8080/api/auth/login', loginData).subscribe({
      next: (res) => {
        if (res && res.role) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('username', res.username);

          // ✅ Role-based navigation
          if (res.role === 'ADMIN') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.errorMsg = 'Invalid login response!';
        }
      },
      error: () => {
        this.errorMsg = 'Invalid username or password!';
      }
    });
  }
}
