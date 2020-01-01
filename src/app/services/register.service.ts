import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map, filter, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) {}

  checkUsernameExists(username: string): Observable<boolean> {
    const allUsers$ = this.userService.getAllUsers$();

    return allUsers$.pipe(
      filter(users => !!users),
      map(users => !!users.filter(user => user.username === username).length),
      first()
    );
  }

  register(username: string, password: string): boolean {
    this.userService.createUser(username, password);
    return this.loginService.login(username, password);
  }
}
