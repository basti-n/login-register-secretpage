import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Joke } from '../models';
import { JokeConfig } from '../configurations/joke-config';

@Injectable({ providedIn: 'root' })
export class JokeService {
  url = 'https://geek-jokes.sameerkumar.website/api';

  constructor(
    private http: HttpClient,
    @Optional() private jokeConfig: JokeConfig
  ) {
    if (!!jokeConfig) {
      this.url = this.jokeConfig.baseUrl;
    }
  }

  getJoke(): Observable<Joke> {
    return this.http
      .get<string>(this.url)
      .pipe(map(jokeString => ({ joke: jokeString })));
  }
}
