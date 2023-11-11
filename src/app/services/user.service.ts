import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/app.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from '../shared/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router, private http: HttpClient) {}

  signUp(payload: User): Observable<any> {
    return this.http.post(
      `${environment.backendUrl}${API_ENDPOINTS.SIGN_UP}`,
      payload
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(
      `${environment.backendUrl}${API_ENDPOINTS.GET_USER_BY_ID}/${id}`
    );
  }

  isLoggedIn() {
    return (
      sessionStorage.getItem('rm_token') && sessionStorage.getItem('rm_userId')
    );
  }

  saveToken(token: string) {
    sessionStorage.setItem('rm_token', token);
  }

  getToken() {
    return sessionStorage.getItem('rm_token') || '';
  }

  saveUserId(userId: string) {
    sessionStorage.setItem('rm_userId', userId);
  }

  getUserId() {
    return sessionStorage.getItem('rm_userId') || '';
  }

  logoutUser() {
    sessionStorage.removeItem('rm_token');
    sessionStorage.removeItem('rm_userId');
    this.router.navigate(['/login']);
  }
}
