import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretButtonComponent } from './secret-button.module';

@NgModule({
  imports: [CommonModule],
  exports: [SecretButtonComponent],
  declarations: [SecretButtonComponent],
})
export class SecretButtonModule { }
