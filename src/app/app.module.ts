import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { WeekPipe } from './pipes/weekday-pipe';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputComponent, TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { DatePipe } from '@angular/common';
import { PreviewComponent } from './components/preview/preview.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EventsViewComponent } from './components/events-view/events-view.component';
import { NotifierOptions } from 'angular-notifier';
import { NotifierModule } from 'angular-notifier';
import { HttpClientModule } from '@angular/common/http';
import { ColorGeneratorPipe } from './pipes/color-generator.pipe';
import { DeleteEventComponent } from './components/delete-event/delete-event.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

import { NgModule } from '@angular/core';
import { ClickDirective } from './components/click.directive';

export const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 50,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] }, // canActivate: [AuthGuard]
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent,
    WeekPipe,
    EventCreateComponent,
    PreviewComponent,
    EventsViewComponent,
    ColorGeneratorPipe,
    DeleteEventComponent,
    ClickDirective,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: [DatePipe, TagInputComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
