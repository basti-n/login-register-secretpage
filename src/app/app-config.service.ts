import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './models';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config: Config;

  constructor(private httpClient: HttpClient) {}

  async loadConfig(): Promise<Config> {
    return this.httpClient
      .get<Config>('/assets/config/config.json')
      .toPromise()
      .then(config => (this.config = config));
  }

  getConfig(): Config {
    return this.config;
  }
}
