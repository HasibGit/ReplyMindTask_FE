import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output('toggleSideNav') toggleSidenav: EventEmitter<void> =
    new EventEmitter();

  isLoggedIn = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  logout() {
    this.userService.logoutUser();
  }
}
