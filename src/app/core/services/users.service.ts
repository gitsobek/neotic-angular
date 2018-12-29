import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { User } from '../models/User'

@Injectable()
export class UsersService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}



  handleError() {

  }

}
