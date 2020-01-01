import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginFacadeService {
  constructor(
    private loginService: LoginService,
  ) {}

  login(user: string, password: string): boolean {
    return this.loginService.login(user, password);
  }

  currentUserisLoggedIn(): Observable<boolean> {
    return this.loginService.currentUserisLoggedIn$();
  }

  isLoggedIn(username: string): boolean {
    return this.loginService.isLoggedIn(username);
  }

  isLoggedIn$(username: string): Observable<boolean> {
    return this.loginService.isLoggedIn$(username);
  }

  logout(username: string) {
    this.loginService.logout(username);
  }
}
