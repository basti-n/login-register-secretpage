import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from './top-bar.component';


@NgModule({
  imports: [CommonModule],
  exports: [TopBarComponent],
  declarations: [TopBarComponent],
})
export class TopBarModule { }
