import { Component, OnInit } from '@angular/core';
import { InitService } from './services/init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private initService: InitService) {}
  ngOnInit(): void {
    // this.initService.handleToken();
  }
}
