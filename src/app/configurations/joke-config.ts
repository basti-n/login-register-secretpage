import { Injectable } from '@angular/core';

@Injectable()
export class JokeConfig {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
}
