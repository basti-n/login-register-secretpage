import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  @Output() loginRequest = new EventEmitter<{
    username: string;
    password: string;
  }>();

  @Output() goToRegister = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginRequest.emit({
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    });
  }

  register() {
    this.goToRegister.emit();
  }
}
