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
  AREAS_OF_INTEREST_RELEVANT_TO_PROFESSION,
  SALUTATIONS,
  USER_PASSWORD_CRITERIA,
  USER_PROFESSIONS,
  YEARS_OF_EXPERIENCE_OPTIONS,
} from '../shared/constants/app.constants';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-create-or-update-profile',
  templateUrl: './create-or-update-profile.component.html',
  styleUrls: ['./create-or-update-profile.component.scss'],
})
export class CreateOrUpdateProfileComponent implements OnInit {
  signupForm: FormGroup;
  personalInformationForm: FormGroup;
  professionalInformationForm: FormGroup;
  isLoading = false;
  salutationOptions = SALUTATIONS;
  hidePassword = true;
  maxDateForDateOrBirth: string;
  experienceInYearsOptions = YEARS_OF_EXPERIENCE_OPTIONS;
  professionOptions = USER_PROFESSIONS;
  areasOfInterestOptions: string[];

  passwordCriteria = USER_PASSWORD_CRITERIA;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setDobConstraint();
    this.initForms();
  }

  initForms() {
    this.signupForm = this.fb.group({
      personalInformation: this.fb.group(
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
        },
        { validator: passwordMatchValidator('Password', 'ConfirmPassword') }
      ),

      professionalInformation: this.fb.group({
        WorkExperienceInYears: ['', Validators.required],
        Profession: ['', Validators.required],
        AreasOfExpertise: [[], [Validators.required]],
        Bio: ['', [Validators.required, maxWordsValidator(50)]],
      }),
    });

    this.personalInformationForm = this.signupForm.get(
      'personalInformation'
    ) as FormGroup;
    this.professionalInformationForm = this.signupForm.get(
      'professionalInformation'
    ) as FormGroup;
  }

  setDobConstraint() {
    const today = new Date();
    this.maxDateForDateOrBirth = today.toISOString().split('T')[0];
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSelectProfession(event: MatSelectChange): void {
    this.areasOfInterestOptions =
      AREAS_OF_INTEREST_RELEVANT_TO_PROFESSION[event.value];
  }

  signup() {
    console.log(this.signupForm.value);
  }
}
