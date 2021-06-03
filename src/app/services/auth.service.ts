import { Injectable } from '@angular/core';
const jwt_decode = require('jwt-decode');
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    // console.log('guard service', !jwt_decode.isTokenExpired(decoded));
    // return !jwtHelper.isTokenExpired(decoded);
    return true;
  }
}
