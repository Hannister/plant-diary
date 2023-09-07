import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CreateNewPlantComponent } from './create-new-plant/create-new-plant.component';
import { DashboardComponent } from './dashboard.component';
import { TopNavigatorComponent } from '../top-navigator/top-navigator.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    TopNavigatorComponent,
    CreateNewPlantComponent,
  ],
})
export class DashboardModule {}
