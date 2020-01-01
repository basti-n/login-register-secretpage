import { NgModule } from '@angular/core';
import { RegisterFormComponent } from './register-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputErrorDirective } from 'src/app/directives/input-error.directive';
import { ShowInputErrorDirective } from 'src/app/directives';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RegisterFormComponent],
  declarations: [
    RegisterFormComponent,
    InputErrorDirective,
    ShowInputErrorDirective,
  ],
})
export class RegisterFormModule {}
