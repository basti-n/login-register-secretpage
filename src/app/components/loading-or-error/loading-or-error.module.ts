import { NgModule } from '@angular/core';
import { LoadingOrErrorComponent } from './loading-or-error.component';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../loading/loading.module';
import { LoadingComponent } from '../loading/loading.component';


@NgModule({
  imports: [CommonModule, LoadingModule],
  exports: [LoadingOrErrorComponent],
  declarations: [LoadingOrErrorComponent],
})
export class LoadingOrErrorModule { }
