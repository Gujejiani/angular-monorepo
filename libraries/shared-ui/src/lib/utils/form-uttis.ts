import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Custom validator function to check if the input contains only Latin letters
export function patternValidator(georgianPattern: RegExp, englishPattern: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        return null; 
      }
      const containsNumbers = /\d/.test(value);
      if ((georgianPattern.test(value) || englishPattern.test(value) ) && !containsNumbers) {
        return null; 
      } else {
        return { errorMessage: "Value must only contain Georgian or Latin letters" }; 
      }
    };
  }

  export function startsWithValidator(prefix: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (value === undefined || value === null || !value.startsWith(prefix)) {
        return { errorMessage: `phone number most start with 5` };
      }
  
      return null;
    };
  }
  
export function genderValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value !== 'male' && value !== 'female') {
      return { errorMessage: 'Invalid Gender' };
    }

    return null;
  };
}