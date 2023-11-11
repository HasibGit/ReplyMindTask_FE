import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/app.interface';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Router } from '@angular/router';
import { LOADER_CONFIG } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  user: User;
  isLoading = false;
  loaderConfig = LOADER_CONFIG;

  constructor(
    private userService: UserService,
    private helperService: HelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService
      .getUserById(this.userService.getUserId())
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.user = res;
        },
        (error) => {
          this.isLoading = false;
          this.userService.logoutUser();
          this.helperService.openSnackBar('Sorry, something went wrong');
          this.router.navigate(['/login']);
        }
      );
  }

  getFullName() {
    return `${this.user.FirstName} ${this.user.LastName}`;
  }
}
