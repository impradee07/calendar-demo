import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

import { DatePipe } from '@angular/common';
import { CalendarEventService } from 'src/app/services/calendar-event.service';
import { TagInputComponent as SourceTagInput } from 'ngx-chips';
import { of } from 'rxjs';
import { throwError } from 'rxjs';
import { EventRequest } from 'src/app/model/eventRequest.model';
import { EventCreateService } from 'src/app/services/event-create.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { CalendarComponent } from 'src/app/pages/calendar/calendar.component';
import { Input } from '@angular/core';
import { Create } from './create.service';
@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss'],
})
export class EventCreateComponent implements OnInit {
  eventType = 'Add Event';
  recievedClickedDate: string;
  private readonly notifier: NotifierService;
  minDate: Date;
  eventData: EventRequest = {
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
    private cService: Create,
    private eventService: CalendarEventService,
    private eventCreateService: EventCreateService,
    public datepipe: DatePipe,
    notifierService: NotifierService,
    bsDatePickerConfig: BsDatepickerConfig,

    private calendarComponent: CalendarComponent
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.notifier = notifierService;
    bsDatePickerConfig.dateInputFormat = 'DD-MM-YYYY';
  }
  displayMails = [];
  model: NgbDateStruct;
  date = new Date();
  currentDate = this.datepipe.transform(this.date, 'dd-MM-YYYY');

  items = [];
  form: FormGroup;
  emails: string;
  @Input() editDetails = null;
  @ViewChild('tagInput')
  tagInput: SourceTagInput;
  public validators = [this.must_be_email.bind(this)];
  public errorMessages = {
    must_be_email: 'Please be sure to use a valid email format',
  };
  public onAddedFunc = this.beforeAdd.bind(this);

  private addFirstAttemptFailed = false;

  private must_be_email(control: FormControl) {
    if (this.addFirstAttemptFailed && !this.validateEmail(control.value)) {
      return { must_be_email: true };
    }
    return null;
  }

  private beforeAdd(tag: any) {
    console.log('tag', tag.value);

    if (!this.validateEmail(tag.value)) {
      if (!this.addFirstAttemptFailed) {
        this.addFirstAttemptFailed = true;
        this.tagInput.setInputValue(tag.value);
      }

      return throwError(this.errorMessages['must_be_email']);
    }
    this.addFirstAttemptFailed = false;
    this.emails = '';
    return of(tag.value);
  }
  private validateEmail(text: string) {
    var EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/i;
    console.log('Insidevalidateemail', text && EMAIL_REGEXP.test(text));

    return text && EMAIL_REGEXP.test(text);
  }

  onAdded($_event: any) {
    console.log($_event.value);
  }

  ngOnInit() {
    this.form = new FormGroup({
      eventTitle: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      members: new FormControl('', [Validators.required]),
    });
    if (this.editDetails != null) {
      console.log('edited', this.editDetails);
      this.eventType = 'Edit Event';
      this.form.patchValue({
        eventTitle: this.editDetails.eventname,
        priority: this.editDetails.pid,
        startDate: this.editDetails.fromDate,
        endDate: this.editDetails.toDate,
        startTime: this.editDetails.fromTime,
        endTime: this.editDetails.toTime,
        description: this.editDetails.eventDescription,
        members: this.editDetails.memberList,
      });
    }
    this.eventCreateService.getSuggestion().subscribe((response) => {
      for (let i = 0; i < response.memberList[0].length; i++) {
        this.displayMails.push(response.memberList[0][i].email);
      }
      console.log(this.displayMails);
    });
    this.displayMails = this.cService.getSuggest();
  }

  getDate() {
    console.log('yes getDate ' + this.currentDate);
    return this.currentDate;
  }
  onSubmit() {
    console.log(this.form.value.members.display);
    console.log(this.form.value.eventTitle);
    this.cService.sendForm(this.form.value).subscribe((res) => {
      console.log('oop', res);
    });
    if (this.form.valid) {
      this.eventData.eventname = this.form.value.eventTitle;
      this.eventData.status = true;
      this.eventData.pid = this.form.value.priority;
      this.eventData.fromDate = moment(this.form.value.startDate);
      this.eventData.toDate = moment(this.form.value.endDate);
      this.eventData.fromTime = this.form.value.startTime + ':00';
      this.eventData.toTime = this.form.value.endTime + ':00';
      this.eventData.eventDescription = 'meet';
      this.eventData.adminid = Number(localStorage.getItem('userid'));
      this.eventData.adminemail = localStorage.getItem('email');
      this.eventData.userrole = 'admin';
      this.eventData.memberList = [this.form.value.members.length];
      this.eventData.repeatmode = 'no repeat';
      this.eventData.weekDays = [1, 2];
      let memList = [];
      for (let i = 0; i < this.form.value.members.length; i++) {
        memList.push(this.form.value.members[i].value);
      }
      this.eventData.memberDetails = [];
      this.eventData.memberUpdated = true;
      this.eventCreateService.getMeetingDetails(this.eventData).subscribe(
        (response) => {
          this.onClose();
          this.showNotification('Event Created', 'success');
          this.calendarComponent.ngOnInit();
          console.log('Respone', response);
        },
        (error) => {
          this.showNotification('Oops something went wrong!', 'error');
          console.log('error', error);
        }
      );
    } else {
      this.showNotification('Invalid event', 'error');
    }
  }

  onClose() {
    console.log(this.currentDate);
    this.eventService.show.next(false);
  }

  get f() {
    return this.form.controls;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.key === 'Escape') {
      this.onClose();
    }
  }

  startsWithAt(control: FormControl) {
    if (control.value.charAt(0) !== '@') {
      return {
        'startsWithAt@': true,
      };
    }

    return null;
  }

  onSelect(event: any) {
    console.log(event);
  }
  showNotification(message: string, type: 'success' | 'error') {
    this.notifier.notify(type, message);
  }
}
