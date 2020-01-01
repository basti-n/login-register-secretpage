import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { LoginFacadeService } from 'src/app/facades/login-facade.service';
import { userIsLoggedIn } from 'src/app/utils/custom-operators/user-is-logged-in';
import { RoutingService } from 'src/app/services/routing.service';
import { map } from 'rxjs/operators';
import { LoginRequest } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  isRedirectFromSecret$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  infoBarDurationInSec = 5;
  showInfoBar = true;
  timer: ReturnType<typeof setTimeout>;

  constructor(
    private userService: UserService,
    private loginFacade: LoginFacadeService,
    private routingService: RoutingService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.userService
      .getCurrentUser()
      .pipe(userIsLoggedIn(this.loginFacade));

    this.isRedirectFromSecret$ = this.routingService
      .getHash()
      .pipe(map(fragment => fragment === 'ref'));

    this.initInfoBarCountdown();
  }

  ngOnDestroy() {
    window.clearTimeout(this.timer);
  }

  login(loginRequest: LoginRequest) {
    const { username, password } = loginRequest;

    if (this.loginFacade.login(username, password)) {
      return this.routingService.goToSecretPage();
    }
  }

  goToRegister() {
    this.routingService.goToRegister();
  }

  private initInfoBarCountdown() {
    this.timer = setTimeout(() => {
      this.showInfoBar = false;
      this.cd.detectChanges();
    }, this.infoBarDurationInSec * 1000);
  }
}
