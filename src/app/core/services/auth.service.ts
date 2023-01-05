import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'https://stg-backend.devcl.net/api/v1/customer/auth';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logIn(payload: any = {}): Observable<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post<User>(url, payload);
  }

  signUp(payload: any = {}): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, payload);
  }
}
