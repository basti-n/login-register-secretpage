import { AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export function checkUsernameExists(
  registerService: RegisterService
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{ [usernameTaken: string]: string } | null> => {
    return registerService
      .checkUsernameExists(control.value)
      .pipe(
        map(result =>
          !!result ? ({ usernameTaken: 'Username already taken' }) : null
        )
      );
  };
}
