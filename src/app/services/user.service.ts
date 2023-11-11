import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  UpdateUserPayload,
  User,
  UserLoginPayload,
} from '../interfaces/app.interface';
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

  updateUser(payload: UpdateUserPayload): Observable<any> {
    return this.http.put(
      `${environment.backendUrl}${
        API_ENDPOINTS.UPDATE_USER
      }/${this.getUserId()}`,
      payload
    );
  }

  deleteUser(): Observable<any> {
    return this.http.delete(
      `${environment.backendUrl}${
        API_ENDPOINTS.DELETE_USER
      }/${this.getUserId()}`
    );
  }

  login(payload: UserLoginPayload): Observable<any> {
    return this.http.post(
      `${environment.backendUrl}${API_ENDPOINTS.LOGIN}`,
      payload
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(
      `${environment.backendUrl}${API_ENDPOINTS.GET_USER_BY_ID}/${id}`
    );
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('rm_token') &&
      sessionStorage.getItem('rm_userId')
      ? true
      : false;
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

  logoutUser(): Observable<any> {
    return this.http.post(
      `${environment.backendUrl}${API_ENDPOINTS.LOGOUT}`,
      null
    );
  }
}
