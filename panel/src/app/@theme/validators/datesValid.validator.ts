import {AbstractControl} from '@angular/forms';

export class DateValidator {

  public static validate(c:AbstractControl) {
    let test = new Date(c.value);
    return test.toString() === "Invalid Date" ? {
      validateDate : {valid: false}
    } : null
  }
}
