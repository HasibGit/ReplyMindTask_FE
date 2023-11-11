import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { NavigationsService } from 'src/app/services/navigations.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output('sidenavLinkClicked') sidenavLinkClicked: EventEmitter<void> =
    new EventEmitter();

  isLoggedIn = false;
  authCheckSubscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private navigationsService: NavigationsService
  ) {}

  ngOnInit(): void {
    this.authCheckSubscription =
      this.navigationsService.isAuthenticated$.subscribe((state) => {
        this.isLoggedIn = state;
      });
  }

  onClickSidenavLink() {
    this.sidenavLinkClicked.emit();
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
        this.onClickSidenavLink();
      });
  }

  ngOnDestroy(): void {
    this.authCheckSubscription.unsubscribe();
  }
}
