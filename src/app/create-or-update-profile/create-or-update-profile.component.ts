import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  atLeastOneValidator,
  dateOfBirthValidator,
  maxWordsValidator,
  passwordMatchValidator,
  passwordStrengthValidator,
} from '../shared/validators/app.validators';
import {
  SALUTATIONS,
  USER_PASSWORD_CRITERIA,
} from '../shared/constants/app.constants';
import { TooltipListPipe } from '../shared/pipes/tooltip-list.pipe';

@Component({
  selector: 'app-create-or-update-profile',
  templateUrl: './create-or-update-profile.component.html',
  styleUrls: ['./create-or-update-profile.component.scss'],
})
export class CreateOrUpdateProfileComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;
  salutationOptions = SALUTATIONS;
  hidePassword = true;
  maxDateForDateOrBirth: string;

  passwordCriteria = USER_PASSWORD_CRITERIA;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setDobConstraint();
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = this.fb.group(
      {
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
            passwordStrengthValidator(),
          ],
        ],
        ConfirmPassword: ['', Validators.required],
        DateOfBirth: [
          '',
          [Validators.required, dateOfBirthValidator.bind(this)],
        ],
        StreetAddress: ['', Validators.required],
        City: ['', Validators.required],
        PostalCode: ['', Validators.required],
        Country: ['', Validators.required],
        WorkExperienceInYears: ['', Validators.required],
        WorkExperiences: [[], [Validators.required, atLeastOneValidator]],
        AreasOfInterest: [[], [Validators.required, atLeastOneValidator]],
        Bio: ['', [Validators.required, maxWordsValidator(50)]],
        TermsAgreed: [false, Validators.requiredTrue],
      },
      { validator: passwordMatchValidator('Password', 'ConfirmPassword') }
    );
  }

  setDobConstraint() {
    const today = new Date();
    this.maxDateForDateOrBirth = today.toISOString().split('T')[0];
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
