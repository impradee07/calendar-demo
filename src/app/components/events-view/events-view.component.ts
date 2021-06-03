import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEventService } from 'src/app/services/calendar-event.service';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss'],
})
export class EventsViewComponent implements OnInit {
  constructor(private eventService: CalendarEventService) {}

  @Input() eventDetails = null;
  event = null;
  @Output() handleFullDetailsModel = new EventEmitter();
  isPreview = false;
  ngOnInit(): void {
    console.log(this.eventDetails);
  }

  onClose() {
    this.handleFullDetailsModel.emit();
  }
  onPreview(event: any) {
    this.event = event;
    this.isPreview = !this.isPreview;
  }
}
