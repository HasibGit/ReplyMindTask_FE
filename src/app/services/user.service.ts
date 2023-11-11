import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}

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
