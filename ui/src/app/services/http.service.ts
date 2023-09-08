import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  post(url: string, body: any) {
    return this.http.post(`${this.baseUrl}/${url}`, body);
  }
  delete(url: string) {
    return this.http.delete(`${this.baseUrl}/${url}`);
  }
  postImage(url: string, body: any) {
    return this.http.post(`${this.baseUrl}/${url}`, body, {
      reportProgress: true,
      observe: 'events'
  });
  }

  get(url: string) {
    return this.http.get(`${this.baseUrl}/${url}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}
