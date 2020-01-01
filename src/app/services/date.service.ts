import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateService {
  constructor() {}

  dateToString(date: Date): string {
    return date.toISOString();
  }
}
