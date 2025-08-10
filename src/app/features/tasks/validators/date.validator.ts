import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dataNaoAnteriorHojeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;
  const today = new Date();
  const inputDate = new Date(control.value);
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);
  return inputDate < today ? { dateBeforeToday: true } : null;
};
