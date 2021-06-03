import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent } from '../model/calendar-event.model';

@Injectable({ providedIn: 'root' })
export class CalendarEventService {
  constructor() {}

  show = new Subject<boolean>();
  prevShow = new Subject<boolean>();
  eventDay: number;
  clicked: boolean = true;
  preview: boolean = true;
  fullView: boolean = true;
  eventChanged = new Subject<CalendarEvent[]>();
  item = new Subject<any>();

  eventFullDetails = new Subject<boolean>();

  onClick() {
    return this.clicked;
  }
  onEdit() {
    return this.preview;
  }

  onFullView() {
    return this.fullView;
  }
}
