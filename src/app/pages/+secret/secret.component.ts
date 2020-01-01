import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { JokeService } from 'src/app/services/joke.service';

@Component({
  selector: 'app-secret',
  templateUrl: 'secret.component.html',
  styleUrls: ['./secret.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecretComponent implements OnInit {
  currentUser$: Observable<User>;
  joke$: Observable<string>;
  loadingErrorSub$ = new Subject<boolean>();
  loadingError$: Observable<boolean> = this.loadingErrorSub$.asObservable();

  constructor(
    private userService: UserService,
    private jokeService: JokeService
  ) {}

  ngOnInit() {
    this.currentUser$ = this.userService.getCurrentUser();
    this.joke$ = this.jokeService.getJoke().pipe(map(joke => joke.joke), catchError(err => {
      this.loadingErrorSub$.next(true);
      return throwError(err);
    }));

  }
}
