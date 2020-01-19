import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Joke } from '../models';
import { AppConfigService } from '../app-config.service';
import { JokeConfig } from '../configurations';
import { Store } from '@ngxs/store';
import { AddJoke } from '../state/joke.actions';

@Injectable({ providedIn: 'root' })
export class JokeService {
  url: string;

  constructor(
    private http: HttpClient,
    private store: Store,
    private configService: AppConfigService,
    @Optional() private jokeConfig: JokeConfig
  ) {
    if (!!jokeConfig) {
      this.url = this.jokeConfig.baseUrl;
    } else {
      this.url = this.configService.getConfig().jokeUrl;
    }
  }

  getJoke(): Observable<Joke> {
    return this.http.get<string>(this.url).pipe(
      tap(joke => this.store.dispatch(new AddJoke(joke))),
      map(jokeString => ({ joke: jokeString })),
    );
  }
}
