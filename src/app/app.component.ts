import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ps-angular-calender';
  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  date = new Date().getDate();
  ngOnInit() {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        if (routerEvent.urlAfterRedirects.includes('login')) {
          this.renderer.addClass(this.document.body, 'bg-login');
        } else {
          this.renderer.removeClass(this.document.body, 'bg-login');
        }
      }
    });
  }
}
