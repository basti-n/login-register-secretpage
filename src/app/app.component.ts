import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { LoginService } from './services/login.service';
import { User } from './models';
import { compareUsername } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  title = 'Umwerk Test Assignment';
  isLoggedIn$: Observable<boolean>;

  constructor(private loginService: LoginService) {
    this.isLoggedIn$ = this.loginService.currentUserisLoggedIn$();
  }

  ngOnDestroy() {}
}
