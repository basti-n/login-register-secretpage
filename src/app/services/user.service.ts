import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import { PasswordService } from './password.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  identifier = 'umwerk_users';
  users = new BehaviorSubject<Map<string, User>>(new Map());

  constructor(
    private dateService: DateService,
    private passwordService: PasswordService
  ) {
    this.users.next(this.loadUsersFromLocalStorage());
  }

  saveUser(user: User) {
    this.localStorageSet(user);
    this.saveUserInSubject(user);
  }

  loadUsersFromLocalStorage() {
    const usersFromLocalStorage = this.localStorageGet();
    return usersFromLocalStorage;
  }

  getUser(username: string): User {
    return this.getAllUsers().find(user => user.username === username);
  }

  getUser$(username: string): Observable<User> {
    return this.users.pipe(map(users => users.get(username)));
  }

  getAllUsers(): User[] {
    const allUsers = this.users.value || this.localStorageGet();

    if (!allUsers) {
      return [];
    }

    return Array.from(allUsers.values());
  }

  getAllUsers$(): Observable<User[]> {
    return this.users.pipe(map(users => Array.from(users.values())));
  }

  private saveUserInSubject(user: User) {
    const updatedUsers = this.users.value.set(user.username, user);

    this.users.next(this.sortUsersBy(updatedUsers));
  }

  getCurrentUser(): Observable<User> {
    return this.users.pipe(
      map(userMap => {
        if (!userMap.size) {
          return null;
        }
        return Array.from(userMap)[userMap.size - 1][1];
      })
    );
  }

  createUser(username: string, password: string): User {
    return {
      username,
      encryptedPassword: this.passwordService.encrypt(password),
      isLoggedIn: false,
      created: this.dateService.dateToString(new Date()),
      lastModified: this.dateService.dateToString(new Date()),
    };
  }

  private localStorageGet(): Map<string, User> {
    const storage = localStorage.getItem(this.identifier);
    const parsedStorage = JSON.parse(storage);

    if (this.isLocalStorageEmpty(parsedStorage)) {
      return new Map();
    }

    return new Map(parsedStorage);
  }

  private localStorageSet(user: User) {
    const storage = this.localStorageGet();

    storage.set(user.username, user);

    localStorage.setItem(
      this.identifier,
      JSON.stringify(Array.from(storage.entries()))
    );
  }

  private isLocalStorageEmpty(storage: object | Array<any>): boolean {
    return !Array.isArray(storage);
  }

  private sortUsersBy(
    users: Map<string, User>,
    key: keyof User = 'lastModified'
  ): Map<string, User> {
    return new Map(
      Array.from(users).sort((a, b) => (a[1][key] > b[1][key] ? 1 : -1))
    );
  }
}
