import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: 'top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TopBarComponent implements OnInit {
  logoUrl = 'https://cdn.dribbble.com/users/151929/screenshots/2262827/umwerk.png';

  @Input() title: string;

  constructor() { }

  ngOnInit() { }
}
