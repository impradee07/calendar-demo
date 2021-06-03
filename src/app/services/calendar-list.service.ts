import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CalendarListService {
  constructor(private http: HttpClient) {}
  getMonth(month: number) {
    let date = new Date();

    let year = date.getFullYear();
    let total = new Date(year, month, 0).getDate();
    let monthArry = [];
    let d;
    for (let day = 0; day <= total; day++) {
      monthArry.push(new Date(year, month, day + 1).getUTCDate());
    }
    console.log('ds', month);
  }
  getEvent(month: string, year: number, userid: string): Observable<any> {
    return this.http.get(
      environment.getEvent +
        'monthview?month=' +
        month +
        '&year=' +
        year +
        '&userId=' +
        userid
    );
  }
  getEventbyID(userid: string) {
    return this.http.get(environment.getEvent + '?id=' + userid);
  }
}
