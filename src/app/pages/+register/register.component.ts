import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RegisterRequest } from 'src/app/models';
import { RegisterService } from 'src/app/services/register.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(
    private registerService: RegisterService,
    private routingService: RoutingService
  ) {}

  register(registerRequest: RegisterRequest) {
    if (
      this.registerService.register(
        registerRequest.username,
        registerRequest.password
      )
    ) {
      this.goToHome();
    }
  }

  private goToHome() {
    this.routingService.goToHome();
  }
}
