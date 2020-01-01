import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoginFacadeService } from 'src/app/facades/login-facade.service';
import { LoginRequest, User } from 'src/app/models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  switchMap,
  filter,
  map,
  distinctUntilChanged,
  take,
} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { compareUsername } from 'src/app/utils';
import { userIsLoggedIn } from 'src/app/utils/custom-operators/user-is-logged-in';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  usps: string[] = [
    'Free of charge',
    'Dedicated Community',
    'More than 200 hands-on experience reports',
  ];
  currentUser$: Observable<User>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private loginFacade: LoginFacadeService,
    private userService: UserService,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    this.currentUser$ = this.userService.getCurrentUser();

    this.isLoggedIn$ = this.currentUser$.pipe(userIsLoggedIn(this.loginFacade));
  }

  login(loginRequest: LoginRequest) {
    const { username, password } = loginRequest;

    if (this.loginFacade.login(username, password)) {
      return this.routingService.goToSecretPage();
    }
  }

  handleSecretBtnClick() {
    this.routingService.goToSecretPage();
  }

  handleLogout() {
    this.currentUser$
      .pipe(
        take(1),
        map(user => this.loginFacade.logout(user.username))
      )
      .subscribe();
  }

  goToRegister() {
    this.routingService.goToRegister();
  }
}
