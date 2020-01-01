import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-list-checkbox',
  templateUrl: 'list-checkbox.component.html',
  styleUrls: ['./list-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListCheckboxComponent implements OnInit {
  @Input() text: string;

  constructor() { }

  ngOnInit() { }
}
