import { Component } from '@angular/core';
import { AuthFormComponent } from 'src/app/shared/auth-form/auth-form.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [AuthFormComponent],
})
export class LoginComponent {
}
