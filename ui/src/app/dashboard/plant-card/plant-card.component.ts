import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IPlant } from 'src/app/interfaces and enums/plant';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgIf, MatIconModule, MatMenuModule],
})
export class PlantCardComponent implements OnInit {
  @Input() plant!: IPlant;

  constructor(private darshboardService: DashboardService) {}

  ngOnInit() {}

  onDeletePlant() {
    this.darshboardService.deleteInStore(this.plant);
  }
}
