import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LocalAuthService } from '../authentication/localauth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: LocalAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = {};
    if(this.auth.getToken()) {
      headers['Authorization'] = `Bearer ${this.auth.getToken()}`;
    }
    const req = request.clone({
      setHeaders: headers
    });

    return next.handle(req);
  }
}
