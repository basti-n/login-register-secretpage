import {
  Directive,
  ElementRef,
  ViewContainerRef,
  TemplateRef,
  Input,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({ selector: '[appShowInputError]' })
export class ShowInputErrorDirective {
  formControl: FormControl | FormGroup;
  errorString: string;

  @Input() set appShowInputErrorFormData([ctrl, str]: [
    FormControl | FormGroup,
    string
  ]) {
    this.formControl = ctrl;
    this.errorString = str;
  }

  @Input() set appShowInputError(formValue: string) {
    if (
      this.formControl &&
      this.formControl.dirty &&
      this.formControl.errors &&
      this.formControl.errors[this.errorString]
    ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(
    private elementRef: ElementRef,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
}
