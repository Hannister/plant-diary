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

  get(url: string) {
    return this.http.get(`${this.baseUrl}/${url}`, {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'body', // to display the full response & as 'body' for type cast
    });
  }
}
