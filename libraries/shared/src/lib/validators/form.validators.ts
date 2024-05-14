import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, map, of, take } from "rxjs";
import { UserModel } from "../models";
export const georgianPattern = /^[\u10A0-\u10FF\s\d]*$/; 
export const englishPattern = /^[a-zA-Z\s\d]*$/; 


export function asyncValidator(apiCall: Observable<any>) {
    // self invoking function to return the validator function
    return function customValidator(): ValidatorFn {
      
          return (control: AbstractControl):Observable<{ [key: string]: string } | null>  => {
           
              return apiCall.pipe(take(1),map((users: any)=>{
                   
                    const alreadyUsed = users?.some((user: UserModel)=> user.personalId === control.value)

                    if(alreadyUsed){
                      console.log('already used')
                      return {errorMessage: 'Personal ID already used'}
                    }
                      return null
                    
                  }))
        }
     
    }();
}
          
  






// Custom validator function to check if the input contains only Latin letters
export function patternValidator(georgianPattern: RegExp, englishPattern: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
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

  /**
   * 
   * @param prefix => string on which the value should start with
   * @returns 
   */
  export function startsWithValidator(prefix: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (value === undefined || value === null || !value.startsWith(prefix)) {
        return { errorMessage: `phone number most start with 5` };
      }
  
      return null;
    };
  }
  
  /**
   * 
   * checks if the value is male or female
   */
export function genderValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value !== 'male' && value !== 'female') {
      return { errorMessage: 'Invalid Gender' };
    }

    return null;
  };
}