import { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'week',
})
export class WeekPipe implements PipeTransform {
  transform(calendarDaysArray: any, weekSize: number): any {
    let calendarDays = [];
    let weekDays = [];

    calendarDaysArray.map((day, index) => {
      weekDays.push(day);
      if (++index % weekSize === 0) {
        calendarDays.push(weekDays);
        weekDays = [];
      }
    });
    return calendarDays;
  }
}
