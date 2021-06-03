import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { eventNames } from 'node:process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventRequest } from '../model/eventRequest.model';

@Injectable({
  providedIn: 'root',
})
export class EventCreateService {
  constructor(private http: HttpClient) {}
  getMeetingDetails(eventData: EventRequest): Observable<any> {
    console.log('eventData--', eventData, environment.createEvent);
    return this.http.post(environment.createEvent, eventData);
  }

  deleteMeetingDetails(event: any): Observable<any> {
    console.log(environment.updateEvent);
    return this.http.post(environment.updateEvent, event);
  }

  getSuggestion(): Observable<any> {
    return this.http.get(environment.suggestion);
  }
}
