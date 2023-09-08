import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HTTPService } from '../../services/http.service';
import { IPlant } from '../../interfaces and enums/plant';
import { IPlantsData } from 'src/app/interfaces and enums/plants-data';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  constructor(private HTTPService: HTTPService) {}

  getAllPlants() {
    return this.HTTPService.get('plants').pipe(
      map((data) => {
        return data as IPlantsData;
      })
    );
  }

  postImage(formData: FormData) {
    return this.HTTPService.post('plants/uploads', formData);
  }

  createPlant(data: IPlant) {
    return this.HTTPService.post('plants', data);
  }

  deletePlant(id: number) {
    return this.HTTPService.delete(`plants/${id}`);
  }
}
