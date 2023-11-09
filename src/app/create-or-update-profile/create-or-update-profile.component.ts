import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { atLeastOneValidator } from '../shared/validators/app.validators';

@Component({
  selector: 'app-create-or-update-profile',
  templateUrl: './create-or-update-profile.component.html',
  styleUrls: ['./create-or-update-profile.component.scss'],
})
export class CreateOrUpdateProfileComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = this.fb.group({
      Salutation: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      DateOfBirth: ['', Validators.required],
      WorkExperienceInYears: ['', Validators.required],
      WorkExperiences: [[], [Validators.required, atLeastOneValidator]],
      AreasOfInterest: [[], [Validators.required, atLeastOneValidator]],
      Bio: ['', Validators.required],
      TermsAgreed: [false, Validators.requiredTrue],
    });
  }
}
