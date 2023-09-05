import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  constructor(private authService: AuthService, private router: Router) {}

  handleToken(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
    }
    // no token
    else if (window.location.pathname.indexOf('errors') > -1) {
      console.log('check me in InitService!');

      // no token
      // do nothing dont log out
    } else {
      this.authService.logout();
      console.log(window.location.pathname);

      this.router.navigate(['/auth/login']);
    }
  }
}
