import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({ selector: '[appInputError]' })
export class InputErrorDirective implements OnInit {
  @Input() formElement: FormControl | FormGroup;
  @Input() errorString: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.setInnerHtml();
  }

  setInnerHtml() {
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', this.formElement.errors[this.errorString]);
  }
}
