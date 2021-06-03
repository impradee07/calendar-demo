import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';
import { NotifierService } from 'angular-notifier';
import { environment } from 'src/environments/environment';

const sign = require('jwt-encode');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  data: any;
  private readonly notifier: NotifierService;
  constructor(
    private router: Router,
    private loginServices: LoginService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  userDetails = new FormGroup({
    userEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  ngOnInit() {}

  onLogin() {
    console.log(this.userDetails.valid);
    this.router.navigate(['/calendar']);
    // if (this.userDetails.valid === true) {
    //   this.isLoading = true;
    //   this.loginServices
    //     .doLogin(this.userDetails.value.userEmail.trim())
    //     .subscribe(
    //       (res) => {
    //         console.log('success response', res);

    //         sessionStorage.setItem('isNavigationFirstTime', 'true');
    //         localStorage.setItem('userid', res.id);
    //         localStorage.setItem('email', res.email);
    //         this.saveDataService.userid = res.id;
    //         this.saveDataService.email = res.email;
    //         this.router.navigate(['/calendar']);
    //         this.isLoading = false;
    //         this.data = {
    //           email: this.userDetails.value.userEmail,
    //           expires: Math.round(new Date().getTime() / 1000) + 3600,
    //         };
    //         const jwt = sign(this.data, environment.secret);
    //         localStorage.setItem('token', jwt);
    //         console.log(
    //           'jwt token for user - email from local torage',
    //           localStorage.getItem('token')
    //         );
    //       },
    //       (error) => {
    //         console.log('error response', error);
    //         this.showNotification(
    //           'Oops! Something went Wrong\n' + error.message,
    //           'error'
    //         );
    //         this.isLoading = false;
    //       }
    //     );
    // }
  }
  showNotification(message: string, type: 'success' | 'error') {
    this.notifier.notify(type, message);
  }
}
