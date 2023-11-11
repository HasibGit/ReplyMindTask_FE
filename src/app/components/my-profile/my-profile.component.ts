import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/app.interface';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Router } from '@angular/router';
import { LOADER_CONFIG } from 'src/app/shared/constants/app.constants';
import { NavigationsService } from 'src/app/services/navigations.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteAccountModalComponent } from 'src/app/modals/delete-account-modal/delete-account-modal.component';

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
    private navigationsService: NavigationsService,
    private router: Router,
    private dialog: MatDialog
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

          // proably token has expired
          sessionStorage.removeItem('rm_token');
          sessionStorage.removeItem('rm_userId');
          this.navigationsService.setAuthenticationState(false);

          this.helperService.openSnackBar('Sorry, something went wrong');
          this.router.navigate(['/login']);
        }
      );
  }

  deleteAccount() {
    const dialogConfig = new MatDialogConfig();
    this.getDialogConfig(dialogConfig);
    const dialogRef = this.dialog.open(
      DeleteAccountModalComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((res) => {
      if (res?.confirmed) {
        this.isLoading = true;
        this.userService
          .deleteUser()
          .pipe(take(1))
          .subscribe(
            () => {
              this.isLoading = false;
              sessionStorage.removeItem('rm_token');
              sessionStorage.removeItem('rm_userId');
              this.navigationsService.setAuthenticationState(false);

              this.helperService.openSnackBar('Your account has been deleted');
              this.router.navigate(['/login']);
            },
            () => {
              this.isLoading = false;
              sessionStorage.removeItem('rm_token');
              sessionStorage.removeItem('rm_userId');
              this.navigationsService.setAuthenticationState(false);

              this.helperService.openSnackBar('Sorry, something went wrong');
              this.router.navigate(['/login']);
            }
          );
      } else {
        console.log('Modal closed');
      }
    });
  }

  getDialogConfig(config: MatDialogConfig) {
    config.autoFocus = true;
    config.disableClose = true;
    config.width = '400px';
  }

  getFullName() {
    return `${this.user.FirstName} ${this.user.LastName}`;
  }
}
