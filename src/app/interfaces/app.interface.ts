export interface User {
  Salutation: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  DateOfBirth: string;
  StreetAddress: string;
  City: string;
  PostalCode: string;
  Country: string;
  WorkExperienceInYears: string;
  Profession: string;
  AreasOfExpertise: string[];
  Bio: string;
}

export interface UserLoginPayload {
  Email: string;
  Password: string;
}

export interface CreateUserFormRawValue {
  personalInformation: PersonalInformation;
  professionalInformation: ProfessionalInformation;
}

interface PersonalInformation {
  Salutation: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  DateOfBirth: string;
  ConfirmPassword: string;
  StreetAddress: string;
  City: string;
  PostalCode: string;
  Country: string;
}

interface ProfessionalInformation {
  AreasOfExpertise: string[];
  Bio: string;
  Profession: string;
  WorkExperienceInYears: string;
}
