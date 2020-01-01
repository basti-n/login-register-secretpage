import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchingPasswordValidator } from 'src/app/validators';
import { checkUsernameExists } from 'src/app/validators/check-username-exists.validator';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  @Output() registerRequest = new EventEmitter<{
    username: string;
    password: string;
  }>();

  constructor(
    private fb: FormBuilder,
    public registerService: RegisterService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.minLength(3)],
          checkUsernameExists(this.registerService)
        ],
        password: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        passwordConfirm: ['', Validators.required],
      },
      { validators: matchingPasswordValidator }
    );
  }

  register() {
    this.registerRequest.emit({
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
    });
  }
}
