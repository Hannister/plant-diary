import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'top-navigator',
  templateUrl: './top-navigator.component.html',
  styleUrls: ['./top-navigator.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
})
export class TopNavigatorComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
