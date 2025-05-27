import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/login';
  private signupUrl = 'http://localhost:8080/api/auth/signup';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password });
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.signupUrl, { username, email, password });
  }
}
