import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterRequest } from '../../interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://13.127.106.130:5001/api'; // Change to your API URL

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }


  public getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  async isLoggedIn(): Promise<boolean> {
    const access_token = this.getAuthToken();
    if (!access_token) {
      return false;
    }
    return true;
  }
}
