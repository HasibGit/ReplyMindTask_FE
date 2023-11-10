import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function atLeastOneValidator(
  control: AbstractControl
): ValidationErrors | null {
  const values: any[] = control.value;
  if (values && values.length > 0) {
    return null; // There is at least one work experience
  }
  return { empty: true }; // Return an error
}

export function maxWordsValidator(maxWords: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // If the control is empty, don't perform validation
    }

    const words = control.value.split(/\s+/).length;

    if (words > maxWords) {
      return { exceedsMaxWords: { maxWords, actualWords: words } };
    }

    return null; // Validation passed
  };
}

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password: string = control.value;

    if (!password) {
      return null; // If the control is empty, don't perform validation
    }

    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    const isValid = hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;

    return isValid ? null : { passwordStrength: true };
  };
}
