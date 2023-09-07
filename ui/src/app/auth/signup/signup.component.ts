import { Component } from '@angular/core';
import { AuthFormComponent } from 'src/app/shared/auth-form/auth-form.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [AuthFormComponent],
})
export class SignupComponent   {

}
