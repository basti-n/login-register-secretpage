import { pipe } from 'rxjs';
import {
  filter,
  switchMap,
  distinctUntilChanged,
} from 'rxjs/operators';
import { User } from 'src/app/models';
import { LoginFacadeService } from 'src/app/facades/login-facade.service';
import { compareUsername } from '../compare-username';

export const userIsLoggedIn = (loginService: LoginFacadeService) =>
  pipe(
    filter((val: User) => !!val),
    distinctUntilChanged((x, y) => compareUsername(x.username, y.username)),
    switchMap(distinctUser => loginService.isLoggedIn$(distinctUser.username))
  );
