import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  atLeastOneValidator,
  dateOfBirthValidator,
  maxWordsValidator,
  passwordMatchValidator,
  passwordStrengthValidator,
} from '../../shared/validators/app.validators';
import {
  AREAS_OF_INTEREST_RELEVANT_TO_PROFESSION,
  LOADER_CONFIG,
  SALUTATIONS,
  USER_PASSWORD_CRITERIA,
  USER_PROFESSIONS,
  YEARS_OF_EXPERIENCE_OPTIONS,
} from '../../shared/constants/app.constants';
import { MatSelectChange } from '@angular/material/select';
import { UserService } from 'src/app/services/user.service';
import { CreateUserFormRawValue, User } from 'src/app/interfaces/app.interface';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';

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
  loaderConfig = LOADER_CONFIG;

  passwordCriteria = USER_PASSWORD_CRITERIA;

  userId: string;
  user: User;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.setDobConstraint();

    this.userId = this.userService.getUserId();

    if (!this.userId) {
      this.initForms();
    } else {
      this.userService
        .getUserById(this.userId)
        .pipe(take(1))
        .subscribe((res) => {
          this.user = res;
          this.isEdit = true;
          this.initForms();
        });
    }
  }

  initForms() {
    this.signupForm = this.fb.group({
      personalInformation: this.fb.group(
        {
          Salutation: [this.user.Salutation || '', Validators.required],
          FirstName: [this.user.FirstName || '', Validators.required],
          LastName: [this.user.LastName || '', Validators.required],
          Email: [
            this.user.Email || '',
            [Validators.required, Validators.email],
          ],
          Password: [
            '',
            !this.isEdit
              ? [
                  Validators.required,
                  Validators.minLength(6),
                  Validators.maxLength(20),
                  passwordStrengthValidator(),
                ]
              : [],
          ],
          ConfirmPassword: ['', !this.isEdit ? [Validators.required] : []],
          DateOfBirth: [
            this.user.DateOfBirth || '',
            [Validators.required, dateOfBirthValidator.bind(this)],
          ],
          StreetAddress: [this.user.StreetAddress || '', Validators.required],
          City: [this.user.City || '', Validators.required],
          PostalCode: [this.user.PostalCode || '', Validators.required],
          Country: [this.user.Country || '', Validators.required],
        },
        { validator: passwordMatchValidator('Password', 'ConfirmPassword') }
      ),

      professionalInformation: this.fb.group({
        WorkExperienceInYears: [
          this.user.WorkExperienceInYears || '',
          Validators.required,
        ],
        Profession: [this.user.Profession || '', Validators.required],
        AreasOfExpertise: [
          this.user.AreasOfExpertise || [],
          [Validators.required],
        ],
        Bio: [
          this.user.Bio || '',
          [Validators.required, maxWordsValidator(50)],
        ],
      }),
    });

    console.log(this.signupForm);

    this.personalInformationForm = this.signupForm.get(
      'personalInformation'
    ) as FormGroup;
    this.professionalInformationForm = this.signupForm.get(
      'professionalInformation'
    ) as FormGroup;

    this.isLoading = false;
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
    this.isLoading = true;

    const userData: CreateUserFormRawValue = this.signupForm.getRawValue();

    const payload: User = this.getCreateUserPayload(userData);

    this.userService
      .signUp(payload)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.userService.saveToken(res.token);
          this.userService.saveUserId(res.userId);
          this.router.navigate(['/']);
          this.helperService.openSnackBar('Account created successfully');
        },
        (error) => {
          this.isLoading = false;
          if (error?.error?.code == '11000') {
            this.helperService.openSnackBar(
              'Account with the given email already exists!'
            );
          } else {
            this.helperService.openSnackBar('Sorry, something went wrong');
          }
        }
      );

    console.log(this.signupForm.value);
  }

  getCreateUserPayload(data: CreateUserFormRawValue): User {
    return {
      Salutation: data.personalInformation.Salutation,
      FirstName: data.personalInformation.FirstName,
      LastName: data.personalInformation.LastName,
      Email: data.personalInformation.Email,
      Password: data.personalInformation.Password,
      ConfirmPassword: data.personalInformation.ConfirmPassword,
      DateOfBirth: data.personalInformation.DateOfBirth,
      StreetAddress: data.personalInformation.StreetAddress,
      City: data.personalInformation.City,
      PostalCode: data.personalInformation.PostalCode,
      Country: data.personalInformation.Country,
      WorkExperienceInYears: data.professionalInformation.WorkExperienceInYears,
      Profession: data.professionalInformation.Profession,
      AreasOfExpertise: data.professionalInformation.AreasOfExpertise,
      Bio: data.professionalInformation.Bio,
    };
  }
}
