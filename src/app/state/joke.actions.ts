export class GetJoke {
  static readonly type = '[Jokes] Get Joke';
}

export class AddJoke {
  static readonly type = '[Jokes] Add Joke';
  constructor(public payload: string) {}
}

export type JokeActions = GetJoke | AddJoke;
