import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PasswordService {
  constructor() {}

  encrypt(password: string): string {
    const encryptedKey = window.btoa(password);
    return encryptedKey;
  }

  decrypt(encryptedPassword: any): string {
    const decryptedKey = window.atob(encryptedPassword);
    return decryptedKey;
  }
}
