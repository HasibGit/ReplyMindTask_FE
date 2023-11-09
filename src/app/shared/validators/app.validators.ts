import { AbstractControl, ValidationErrors } from '@angular/forms';

export function atLeastOneValidator(
  control: AbstractControl
): ValidationErrors | null {
  const values: any[] = control.value;
  if (values && values.length > 0) {
    return null; // There is at least one work experience
  }
  return { empty: true }; // Return an error
}
