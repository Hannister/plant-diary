import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [CommonModule, AuthRoutes, LoginComponent, SignupComponent],
  declarations: [],
})
export class AuthModule {}
