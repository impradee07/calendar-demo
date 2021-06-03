import { Component, OnInit } from '@angular/core';
import { CalendarDay } from 'src/app/services/calendar-day.service';
import { CalendarEventService } from 'src/app/services/calendar-event.service';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';
import { CalendarListService } from 'src/app/services/calendar-list.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  private readonly notifier: NotifierService;
  userID: string = localStorage.getItem('userid');
  emailID: string = localStorage.getItem('email');
  constructor(
    private eventService: CalendarEventService,
    notifierService: NotifierService,
    private calendarListService: CalendarListService
  ) {
    this.notifier = notifierService;
  }

  eventDetails = null;
  preview: boolean = false;
  fullView: boolean = false;
  clicked: boolean = false;
  isDropdown: boolean = false;
  isViewDropdown: boolean = false;
  public calendar: CalendarDay[] = [];
  public monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  displayMonth: string;
  displayYear: number;
  public displayDay: number;
  public month: number;
  private monthIndex: number = 0;
  event: Event;
  selectedDate = null;
  calendarEvents: any;
  id = 0;
  currdate = new Date().toDateString();
  temp = new Date().getMonth();

  ngOnInit(): void {
    if (sessionStorage.getItem('isNavigationFirstTime')) {
      this.showNotification('Welcome ' + this.emailID, 'success');
      sessionStorage.removeItem('isNavigationFirstTime');
    }
    this.generateCalendarDays(this.monthIndex);
    console.log('getting id and email', this.userID, this.emailID);
    console.log('get month and date', new Date().getMonth());
    console.log(
      this.monthNames[new Date().getMonth()],
      this.displayMonth,
      new Date().getFullYear()
    );
    let sumMonth = new Date().getMonth() + 1;
    let sendMonth = '0' + sumMonth;
    this.getEventDetails(sendMonth, new Date().getFullYear(), this.userID);
  }
  // getEventDetails(userId: string) {
  //   this.calendarListService.getEventbyID(userId).subscribe(
  //     (responseData) => {
  //       let customEvent = {};
  //       console.log('getting event initial response data', responseData);

  //       for (let event of responseData[0]) {
  //         if (
  //           customEvent[moment(event.day).format('DD-MM-yyyy')] &&
  //           customEvent[moment(event.day).format('DD-MM-yyyy')].length > 0
  //         ) {
  //           customEvent[moment(event.day).format('DD-MM-yyyy')].push(event);
  //         } else {
  //           customEvent[moment(event.day).format('DD-MM-yyyy')] = [event];
  //         }
  //       }
  //       this.events = customEvent;
  //     },
  //     (error) => {
  //       this.events = {};
  //       this.showNotification('Oops! Something went Wrong', 'error');
  //     }
  //   );
  // }

  getEventDetails(month: string, year: number, userId: string) {
    this.calendarListService.getEvent(month, year, userId).subscribe(
      (responseData) => {
        let customEvent = {};
        console.log(
          'getting event initial response data',
          responseData.eventList[0]
        );
        for (let i = 1; i < 32; i++) {
          customEvent[
            `${String(i).length == 1 ? '0' + i : i}-${month}-${year}`
          ] = [];
        }
        for (let event of responseData.eventList[0]) {
          if (event.status) {
            customEvent[moment(event.fromDate).format('DD-MM-YYYY')].push({
              ...event,
              displayTime: moment(event.fromDate).format('DD-MM-YYYY'),
            });
          }
        }

        // customEvent['10-05-2021'].push({
        //   adminemail: 'sri@gmail.com',
        //   displayTime: '10-05-2021',
        //   eventDescription: '',
        //   eventType: 'Birthday',
        //   eventname: 'Catchup',
        //   expired: false,
        //   fromDate: '2021-05-10',
        //   fromTime: '09:00:00',
        //   id: 91,
        // });
        this.calendarEvents = customEvent;
        console.log(this.calendarEvents);
      },
      (error) => {
        this.calendarEvents = {};
        console.log(error);

        this.showNotification(
          'Oops! Something went Wrong! ' + error.statusText,
          'error'
        );
      }
    );
  }
  setSelectedDate(date: string) {
    this.selectedDate = moment(date).format('DD-MM-YYYY');
    console.log(this.calendarEvents[this.selectedDate], 'hello');
    this.fullView = this.eventService.onFullView();
    this.eventService.eventFullDetails.subscribe((data) => {
      this.fullView = data;
      console.log('call');
    });
  }

  private generateCalendarDays(monthIndex: number): void {
    this.calendar = [];
    let day: Date = new Date(
      new Date().setMonth(new Date().getMonth() + monthIndex)
    );
    console.log(this.monthIndex, this.displayMonth);
    this.displayMonth = this.monthNames[day.getMonth()];
    this.displayYear = day.getFullYear();
    this.displayDay = day.getDate();
    this.month = day.getMonth();
    let startingDateOfCalendar = this.getStartDateForCalendar(day);
    let dateToAdd = startingDateOfCalendar;
    for (var i = 0; i < 36; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date) {
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(1));
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(
          startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1)
        );
      } while (startingDateOfCalendar.getDay() != 1);
    }
    return startingDateOfCalendar;
  }

  increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
    console.log('Month index  ', this.monthIndex);
  }

  decreaseMonth() {
    this.monthIndex--;
    this.generateCalendarDays(this.monthIndex);
    console.log('Month index  ', this.monthIndex);
  }
  setToday() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }
  arr = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  onEvent(day: Date) {
    // let selectedMonth = ('' + day).substring(4, 7);
    // let clickedDate = ('' + day).substring(8, 10);
    // let clickedDateAsNumber: number = +clickedDate;
    // let currentCheckMonth = this.arr[new Date().getMonth()].substring(0, 3);
    // let currentCheckDate = new Date().getDate();
    // let lenMonth = '';
    // if (new Date().getMonth().toString.length == 1) {
    //   let sumMonth = new Date().getMonth() + 1;
    //   lenMonth = '0' + sumMonth;
    // }
    // this.sendingClickedDate =
    //   new Date().getDate() + '/' + lenMonth + '/' + new Date().getFullYear();
    // this.saveDataService.passingClickedDate = day;
    // console.log('main date', day);
    // console.log('log month', this.sendingClickedDate);
    // console.log('date check', clickedDateAsNumber);

    // console.log(
    //   'hellllo',
    //   selectedMonth,
    //   currentCheckMonth,
    //   clickedDateAsNumber,
    //   currentCheckDate
    // );
    // if (new Date(day).getFullYear() >= new Date().getFullYear()) {
    //   if (clickedDateAsNumber >= currentCheckDate) {
    //     console.log('datw', clickedDateAsNumber, currentCheckDate);

    //     this.clicked = this.eventService.onClick();
    //     this.eventService.show.subscribe((data) => {
    //       this.clicked = data;
    //       console.log('call');
    //       console.log(this.calendarEvents);
    //     });
    //   } else {
    //     if (new Date(day).getMonth() > new Date().getMonth()) {
    //       this.clicked = this.eventService.onClick();
    //       this.eventService.show.subscribe((data) => {
    //         this.clicked = data;
    //         console.log('call');
    //         console.log(this.calendarEvents);
    //       });
    //     } else {
    //     }
    //   }
    // }
    let eventDate = day.toLocaleDateString();
    let date = new Date().toLocaleDateString();
    if (eventDate >= date && day.getMonth() === this.month) {
      console.log('iss', day >= new Date(), 'sai', day == new Date());
      console.log(day, new Date());

      this.clicked = this.eventService.onClick();
      this.eventService.show.subscribe((data) => {
        this.clicked = data;
        console.log('call');
        console.log(this.calendarEvents);
      });
    }
  }
  onViewDropdown() {
    this.isViewDropdown = !this.isViewDropdown;
  }
  onDropdown() {
    this.isDropdown = !this.isDropdown;
  }

  onEdit(events: any) {
    this.eventDetails = events;
    this.preview = this.eventService.onEdit();
    this.eventService.prevShow.subscribe((data) => {
      this.preview = data;
    });
    this.eventService.item.next(events);
  }

  handleFullDetailsModel(flag: boolean) {
    if (flag) {
      this.selectedDate = null;
    }
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notifier.notify(type, message);
  }

  setDropDownMonth(index: number) {
    this.isDropdown = !this.isDropdown;
    console.log(index - new Date().getMonth());
    this.monthIndex = index - new Date().getMonth();
    console.log(
      'mm',
      this.arr
    );

    this.calendarListService.getMonth(
      this.monthNames.indexOf(this.displayMonth) + 1
    );
    this.generateCalendarDays(this.monthIndex);
  }
}
