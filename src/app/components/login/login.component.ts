import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { NavigationsService } from 'src/app/services/navigations.service';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private helperService: HelperService,
    private navigationsService: NavigationsService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
    });
  }

  login() {
    this.isLoading = true;
    const payload = this.loginForm.getRawValue();
    this.userService
      .login(payload)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.userService.saveToken(res.token);
          this.userService.saveUserId(res.userId);
          this.router.navigate(['/']);
          this.navigationsService.setAuthenticationState(true);
        },
        (error) => {
          this.isLoading = false;
          if (error.status === 500) {
            this.helperService.openSnackBar('Sorry, something went wrong.');
          } else {
            this.helperService.openSnackBar(
              error?.error?.message || 'Sorry, something went wrong.'
            );
          }
        }
      );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
