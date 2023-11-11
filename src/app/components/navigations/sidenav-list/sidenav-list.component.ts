import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output('sidenavLinkClicked') sidenavLinkClicked: EventEmitter<void> =
    new EventEmitter();

  isLoggedIn = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  onClickSidenavLink() {
    this.sidenavLinkClicked.emit();
  }

  logout() {
    this.userService.logoutUser();
  }
}
