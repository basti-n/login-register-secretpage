import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-logout-button',
  templateUrl: 'logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutButtonComponent {
  @Output() logout = new EventEmitter();

  constructor() {}

  onLogout() {
    this.logout.emit();
  }
}
