import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models';
import { DateService } from './date.service';
import { UserService } from './user.service';
import { compareLoggedInState } from '../utils';
import { PasswordService } from './password.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private dateService: DateService,
    private userService: UserService,
    private passwordService: PasswordService
  ) {}

  getUser(username: string): User {
    return this.userService.getUser(username);
  }

  currentUserisLoggedIn$(): Observable<boolean> {
    return this.userService
      .getCurrentUser()
      .pipe(map(user => (!!user ? this.isLoggedIn(user.username) : false)));
  }

  isLoggedIn(username: string): boolean {
    return (
      this.userService.getUser(username) &&
      this.userService.getUser(username).isLoggedIn
    );
  }

  isLoggedIn$(username: string): Observable<boolean> {
    return this.userService.getUser$(username).pipe(
      map(user => user && !!user.isLoggedIn),
      distinctUntilChanged(compareLoggedInState)
    );
  }

  login(username: string, password: string): boolean {
    const user =
      this.getUser(username) || this.userService.createUser(username, password);

    if (this.isLoggedIn(user.username)) {
      window.alert(`${username} already logged in!`);
    }

    if (!this.verifyPassword(user, password)) {
      window.alert('Wrong Password');
      return false;
    }

    const loggedInUser = {
      ...user,
      username,
      isLoggedIn: true,
      lastLoggedIn: this.dateService.dateToString(new Date()),
      lastModified: this.dateService.dateToString(new Date()),
    };

    this.userService.saveUser(loggedInUser);
    return this.isLoggedIn(user.username);
  }

  private verifyPassword(user: User, password: string): boolean {
    const encryptedInputPassword = this.passwordService.encrypt(password);
    const encryptedActualPassword = user.encryptedPassword;

    return encryptedActualPassword === encryptedInputPassword;
  }

  logout(username: string) {
    const user = this.getUser(username);

    if (!user) {
      return;
    }

    const loggedOutUser = {
      ...user,
      isLoggedIn: false,
      lastModified: this.dateService.dateToString(new Date()),
    };

    this.userService.saveUser(loggedOutUser);
  }

  logoutAllUsers() {
    const allUsers = this.userService.getAllUsers();
    allUsers.forEach(user => this.logout(user.username));
  }
}
