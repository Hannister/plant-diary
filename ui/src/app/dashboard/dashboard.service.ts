import { Injectable } from '@angular/core';
import { HTTPService } from '../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private HTTPService: HTTPService) {}

  getAllPlants() {
    return this.HTTPService.get('plants');
  }

  postImage(formData: FormData) {
    return this.HTTPService.post('plants/uploads', formData);
  }

  createPlant(data: any) {
    console.log(data);
    return this.HTTPService.post('plants', data);
  }
}
