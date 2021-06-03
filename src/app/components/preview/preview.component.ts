import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CalendarEventService } from 'src/app/services/calendar-event.service';
import { ConfirmationDialogService } from 'src/app/services/delete-event.service';
import { NotifierService } from 'angular-notifier';
import { EventCreateService } from 'src/app/services/event-create.service';
import { updateRequest } from 'src/app/model/eventRequest.model';
import { CalendarComponent } from 'src/app/pages/calendar/calendar.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  deleteDetails: updateRequest = {
    id: null,
    eventname: null,
    status: null,
    pid: null,
    fromDate: null,
    toDate: null,
    fromTime: null,
    toTime: null,
    eventDescription: null,
    adminid: null,
    adminemail: null,
    userrole: null,
    memberList: null,
    repeatmode: null,
    weekDays: null,
    memberDetails: null,
    memberUpdated: null,
  };
  constructor(
    private eventService: CalendarEventService,
    private eventCreateService: EventCreateService,
    private confirmationDialogService: ConfirmationDialogService,
    private notifier: NotifierService,
    private calendarComponent: CalendarComponent
  ) {}
  show: boolean = false;
  clickedDeleteEvent: boolean = false;
  item: string;
  @Output() onPreview = new EventEmitter();
  @Input() eventDetails = null;
  ngOnInit() {
    console.log(this.eventDetails);
    this.deleteDetails.id = this.eventDetails.id;
    this.deleteDetails.eventname = this.eventDetails.eventname;
    this.deleteDetails.status = false;
    this.deleteDetails.pid = this.eventDetails.pid;
    this.deleteDetails.fromDate = this.eventDetails.fromDate;
    this.deleteDetails.toDate = this.eventDetails.toDate;
    this.deleteDetails.fromTime = this.eventDetails.fromTime;
    this.deleteDetails.toTime = this.eventDetails.toTime;
    this.deleteDetails.eventDescription = this.eventDetails.eventDescription;
    this.deleteDetails.adminid = this.eventDetails.adminid;
    this.deleteDetails.adminemail = this.eventDetails.adminemail;
    this.deleteDetails.userrole = this.eventDetails.userrole;
    this.deleteDetails.memberList = null;
    this.deleteDetails.repeatmode = this.eventDetails.repeatmode;
    this.deleteDetails.weekDays = [1, 2];
    this.deleteDetails.memberDetails = [{ id: null, email: 'twst@gmail.com' }];
    this.deleteDetails.memberUpdated = this.eventDetails.memberUpdated;
  }

  onClose() {
    this.eventService.prevShow.next(false);
    this.onPreview.emit(false);
  }

  goto() {
    // this.eventService.prevShow.next(false);
    // this.eventService.show.next(true);

    this.show = this.eventService.onClick();

    this.eventService.show.subscribe((data) => {
      this.show = data;
    });
  }

  // deleteEvent(){

  onDelete() {
    this.confirmationDialogService
      .confirm('Please confirm..', 'Do you want to delete this event?')
      .then((confirmed) => {
        this.eventDetails.activeStatus = false;
        this.eventCreateService
          .deleteMeetingDetails(this.deleteDetails)
          .subscribe(
            (res) => {
              console.log('yes');
              this.showNotification('Event deleted successfully', 'success');
              this.calendarComponent.ngOnInit();
            },
            (error) => {
              console.log('no');
              console.log(error);
              console.log(this.deleteDetails);
              this.showNotification('Oops something went wrong', 'error');
            }
          );
      })
      .catch(() => console.log('dropped'));
  }
  showNotification(message: string, type: 'success' | 'error') {
    this.notifier.notify(type, message);
  }
}
