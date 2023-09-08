import { Injectable } from '@angular/core';
import { DashboardDataService } from './dashboard-data.service';
import { Observable, of } from 'rxjs';
import { IPlant } from 'src/app/interfaces and enums/plant';
import { Store } from '@ngrx/store';
import * as fromPlants from '../../store/index';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  plants!: IPlant[];
  userName = '';
  plantcount = 0;

  constructor(
    private dashboardDataService: DashboardDataService,
    private store: Store
  ) {}

  getAllPlants() {
    return this.dashboardDataService.getAllPlants();
  }

  getPlants(): Observable<IPlant[]> {
    return of(this.plants);
  }

  createPlant(plant: IPlant): Observable<IPlant> {
    this.plants = [...this.plants, plant];
    return of(plant);
  }

  deletePlant(plant: IPlant): Observable<IPlant> {
    this.plants = this.plants.filter((b) => b._id !== plant._id);
    return of(plant);
  }

  updatePlant(updatePlant: IPlant): Observable<IPlant> {
    this.plants.map((plant) =>
      plant._id === updatePlant._id ? updatePlant : plant
    );

    return of(updatePlant);
  }

  createInStore(plant: IPlant): void {
    this.store.dispatch(fromPlants.createPlant({ plant }));
  }
  createInDB(plant: IPlant) {
    return this.dashboardDataService.createPlant(plant);
  }

  deleteInStore(plant: IPlant): void {
    this.dashboardDataService.deletePlant(plant._id).subscribe(() => {
      this.store.dispatch(fromPlants.deletePlant({ plant }));
    });
  }

  uploadImage(formData: FormData) {
    return this.dashboardDataService.postImage(formData);
  }
}
