import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-secret-button',
  templateUrl: 'secret-button.component.html',
  styleUrls: ['./secret-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecretButtonComponent {
  @Output() secretBtnClick = new EventEmitter();

  constructor() {}

  onClick() {
    this.secretBtnClick.emit();
  }
}
