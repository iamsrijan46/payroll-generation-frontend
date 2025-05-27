import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private signupUrl = 'http://localhost:8080/api/auth/signup';
  private loginUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(this.signupUrl, data);
  }

  login(data: any) {
    return this.http.post(this.loginUrl, data);
  }
}
