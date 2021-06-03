import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Create {
  constructor(private http: HttpClient) {}
  sendForm(data: any) {
    return this.http.post(
      'https://calendar-5d06e-default-rtdb.firebaseio.com/forms.json',
      data
    );
  }
  getForm() {
    return this.http.get(
      'https://calendar-5d06e-default-rtdb.firebaseio.com/forms.json'
    );
  }
  arr = [];
  getSuggest() {
    this.http
      .get(
        'https://calendar-5d06e-default-rtdb.firebaseio.com/suggestions.json'
      )
      .subscribe((res) => {
        // for (let i in res) {
        //   console.log(res[i]['members'][0]['display']);
        //   this.arr.push(res[i]['members'][0]['display']);
        //   this.arr.push(res[i]['members'][1]['display']);
        // }
        console.log('em', res['email']);
        this.arr.push(...res['email']);
      });
    return this.arr;
  }
}
