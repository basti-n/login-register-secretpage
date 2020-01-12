import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Config } from './app/models';

(async () => {
  const response = await fetch('/assets/config/config.json');
  const config: Config = await response.json();

  if (!environment.production) {
    environment.jokeUrl = config.jokeUrlDev;
  }

  if (environment.production) {
    environment.jokeUrl = config.jokeUrl;
    enableProdMode();
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
})();
