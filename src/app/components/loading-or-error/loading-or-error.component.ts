import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
} from '@angular/core';
import { NgIfContext } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-or-error',
  templateUrl: 'loading-or-error.component.html',
  styleUrls: ['./loading-or-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOrErrorComponent implements OnInit {
  @ViewChild('template', { static: true }) template: TemplateRef<
    NgIfContext
  > | null = null;

  @Input() showError$: Observable<boolean> = null;

  @Input() errorMessage = 'Sorry, an error occured';

  constructor() {}

  ngOnInit() {}
}
