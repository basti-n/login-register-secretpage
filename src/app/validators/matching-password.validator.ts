import { FormGroup } from '@angular/forms';

export function matchingPasswordValidator(
  formGroup: FormGroup
): { passwordError?: string; passwordMatchError?: string } | null {
  const password = formGroup.get('password').value;
  const confirmPassword = formGroup.get('passwordConfirm').value;

  if (!confirmPassword) {
    return { passwordError: 'No Confirm Password Provided' };
  }

  if (!password) {
    return { passwordError: 'No Password Provided' };
  }

  if (confirmPassword !== password) {
    if (confirmPassword.length !== password.length) {
      return { passwordError: 'Passwords do not match in length' };
    }
    return { passwordMatchError: 'Passwords do not match' };
  }

  return null;
}
