import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Joke } from '../models';
import { AppConfigService } from '../app-config.service';
import { JokeConfig } from '../configurations';

@Injectable({ providedIn: 'root' })
export class JokeService {
  url: string;

  constructor(
    private http: HttpClient,
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
    return this.http
      .get<string>(this.url)
      .pipe(map(jokeString => ({ joke: jokeString })));
  }
}
