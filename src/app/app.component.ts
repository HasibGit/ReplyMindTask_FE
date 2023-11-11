import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { NavigationsService } from './services/navigations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'replymind-task-frontend';
  constructor(
    private userService: UserService,
    private navigationsService: NavigationsService
  ) {}

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.navigationsService.setAuthenticationState(true);
    }
  }
}
