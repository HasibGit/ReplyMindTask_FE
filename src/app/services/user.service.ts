import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

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
}
