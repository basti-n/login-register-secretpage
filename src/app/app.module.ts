import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LoadingOrErrorModule } from './components/loading-or-error';
import { LoginFormModule } from './components/login-form';
import { TopBarModule } from './components/top-bar';
import { NavBarModule } from './components/nav-bar';
import { ListCheckboxModule } from './components/list-checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { SecretButtonModule } from './components/secret-button/secret-button.component';
import { LogoutButtonModule } from './components/logout-button/logout-button.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/+home/home.component';
import { SecretComponent } from './pages/+secret/secret.component';
import { LoginComponent } from './pages/+login/login.component';
import { RegisterComponent } from './pages/+register/register.component';
import { RegisterFormModule } from './components/register-form';
import { AppConfigService } from './app-config.service';

export function initConfigFactory(configService: AppConfigService) {
  return () => configService.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SecretComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginFormModule,
    TopBarModule,
    NavBarModule,
    ListCheckboxModule,
    LoadingOrErrorModule,
    SecretButtonModule,
    LogoutButtonModule,
    RegisterFormModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfigFactory,
      deps: [AppConfigService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
