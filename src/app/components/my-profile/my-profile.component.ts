import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/app.interface';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  user: User;

  constructor() {}

  ngOnInit(): void {
    this.user = {
      Salutation: 'Mr.',
      FirstName: 'John',
      LastName: 'Doe',
      Email: 'john.doe@example.com',
      Password: '1qaz<LP_',
      ConfirmPassword: '1qaz<LP_',
      DateOfBirth: '1990-01-01',
      StreetAddress: '123 Main St',
      City: 'Cityville',
      PostalCode: '12345',
      Country: 'United States',
      WorkExperienceInYears: '5',
      Profession: 'Software Engineer',
      AreasOfExpertise: ['Frontend Development', 'Backend Development'],
      Bio: 'Passionate software engineer with a focus on building scalable and user-friendly applications.',
    };
  }

  getFullName() {
    return `${this.user.FirstName} ${this.user.LastName}`;
  }
}
