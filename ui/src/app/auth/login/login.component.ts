import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
  ],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  errorMsg = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    } else if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login() {
    if (this.email.value && this.password.value) {
      this.authService.login(this.email.value, this.password.value).subscribe({
        next: () => {
          this.errorMsg = '';
          this.router.navigate(['/dashboard']);
        },
        error: (e) => {
          this.errorMsg = e.error.msg;
        },
      });
    }
  }
}
