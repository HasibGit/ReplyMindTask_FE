import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationsService {
  isAuthenticated$: Subject<boolean> = new BehaviorSubject(false);
  constructor() {}

  setAuthenticationState(state: boolean) {
    this.isAuthenticated$.next(state);
  }
}
