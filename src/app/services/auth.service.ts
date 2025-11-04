import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Iuser } from '../models/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = environment.apiKatrina;

  constructor(private _httpClient: HttpClient) { }

  reigter(user: Iuser): Observable<any> {
    return this._httpClient.post(`${this.apiURL}/register`, user);
  }

  loginService(user: Iuser): Observable<any> {
    return this._httpClient.post(`${this.apiURL}/login`, user);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
