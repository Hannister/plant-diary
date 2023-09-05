import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  loginForm!: FormGroup;
  errorMsg = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
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
