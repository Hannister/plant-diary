import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, CommonModule],
})
export class AuthFormComponent implements OnInit {
  @Input() isRegisterForm = false;
  @Input() title = 'Login';

  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  errorMsg = '';

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.isRegisterForm) {
      this.loginForm = new FormGroup({
        name: this.name,
        email: this.email,
        password: this.password,
      });
    } else {
      this.loginForm = new FormGroup({
        email: this.email,
        password: this.password,
      });
    }
  }

  onRegister() {
    if (this.name.value && this.email.value && this.password.value) {
      this.authService
        .register(this.name.value, this.email.value, this.password.value)
        .subscribe({
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

  onLogin() {
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
