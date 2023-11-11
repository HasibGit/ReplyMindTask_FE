import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { NavigationsService } from 'src/app/services/navigations.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output('toggleSideNav') toggleSidenav: EventEmitter<void> =
    new EventEmitter();

  isLoggedIn: boolean;
  authCheckSubscription: Subscription;

  constructor(
    private userService: UserService,
    private navigationsService: NavigationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authCheckSubscription =
      this.navigationsService.isAuthenticated$.subscribe((state) => {
        this.isLoggedIn = state;
      });
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  logout() {
    this.userService
      .logoutUser()
      .pipe(take(1))
      .subscribe((res) => {
        sessionStorage.removeItem('rm_token');
        sessionStorage.removeItem('rm_userId');
        this.router.navigate(['/login']);
        this.navigationsService.setAuthenticationState(false);
      });
  }

  ngOnDestroy(): void {
    this.authCheckSubscription.unsubscribe();
  }
}
