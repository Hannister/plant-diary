import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HTTPService } from '../services/http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private HTTPService: HTTPService, private router: Router) {}

  login(email: string, password: string) {
    // Send a POST request to the server to authenticate the user
    return this.HTTPService.post('auth/login', {
      email,
      password,
    }).pipe(
      map((response: any) => {
        const { token } = response;
        this.setToken(token);
      })
    );
  }
  register(name: string, email: string, password: string) {
    // Send a POST request to the server to authenticate the user
    return this.HTTPService.post('auth/register', {
      name,
      email,
      password,
    }).pipe(
      map((response: any) => {
        const { token } = response;
        this.setToken(token);
      })
    );
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('access_token');
    }
    return this.token;
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  private removeToken(): void {
    this.token = null;
    localStorage.removeItem('access_token');
  }
}
