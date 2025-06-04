import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private readonly USER_ID_KEY = 'loggedInUserId';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  setLoggedInUserId(userId: number): void {
    localStorage.setItem(this.USER_ID_KEY, userId.toString());
  }

  getLoggedInUserId(): number | null {
  const id = localStorage.getItem('userId');
  console.log(id)
  return id ? parseInt(id, 10) : null;
}

  clearSession(): void {
    localStorage.removeItem(this.USER_ID_KEY);
  }
}
