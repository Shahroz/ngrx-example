import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  protected headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Accept', 'application/json');
  }

  fetchData(request: any): Observable<any> {
    return this.http.get(request.url, {
      headers: this.headers
    });
  }
}
