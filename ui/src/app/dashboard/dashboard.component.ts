import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewPlantComponent } from './create-new-plant/create-new-plant.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  plants = {};
  userName = '';
  plantsCount = 0;
  constructor(
    private dashboardService: DashboardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dashboardService.getAllPlants().subscribe((data: any) => {
      console.log(data);
      this.userName = data.user;
      this.plants = data.plants;
      this.plantsCount = data.count;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNewPlantComponent, {
      data: { name: this.userName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
