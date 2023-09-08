import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewPlantComponent } from './create-new-plant/create-new-plant.component';
import { DashboardService } from './services/dashboard.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPlant } from '../interfaces and enums/plant';
import { IPlantsData } from '../interfaces and enums/plants-data';
import * as fromPlants from '../store/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  plants$!: Observable<IPlant[]>;
  isLoading$!: Observable<boolean>;
  userName = '';

  constructor(
    public dashboardService: DashboardService,
    public dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.dashboardService.getAllPlants().subscribe((data: IPlantsData) => {
      this.dashboardService.plants = data.plants;
      this.userName = data.user;
      this.initDispatch();
      this.initSubscriptions();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNewPlantComponent);
    dialogRef.afterClosed();
  }

  private initDispatch(): void {
    this.store.dispatch(fromPlants.getPlants());
  }

  private initSubscriptions(): void {
    this.plants$ = this.store.pipe(select(fromPlants.selectPlants));
    this.isLoading$ = this.store.pipe(select(fromPlants.selectPlantsIsLoading));
  }
}
