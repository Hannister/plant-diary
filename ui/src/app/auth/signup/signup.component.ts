import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
})
export class SignupComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  errorMsg = '';

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    console.log(1);
    if (this.name.value && this.email.value && this.password.value) {
      this.authService
        .registe(this.name.value, this.email.value, this.password.value)
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
}
