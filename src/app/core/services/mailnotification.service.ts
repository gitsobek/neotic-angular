import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class MailnotificationService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendEmailAdress(email) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    this.http.post(this.apiUrl + 'emails', JSON.stringify(email), {
      headers: headers
    })
    .subscribe(data => {
      console.log(data);
    })
  }
}
