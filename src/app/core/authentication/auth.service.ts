import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

export interface UserDetails{
  _id: string,
  email: string,
  user: string,
  exp: number,
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  email: string,
  password: string,
  name?: string
}

@Injectable()
export class AuthService {
  private token: string;
  private apiUrl: string = environment.apiUrl;

  private currentUser = new ReplaySubject<UserDetails>();
  public user = this.currentUser.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private _notifService: NotificationsService) {
  }

  public getMyProfile(): void {
    const token = this.getToken();
    if(token) {
      this.http.get(this.apiUrl + 'auth/me')
      .subscribe((data: UserDetails) => this.currentUser.next(data))
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method == 'post') {
      base = this.http.post(this.apiUrl + 'auth/' + `${type}`, user);
    } else {
      base = this.http.get(this.apiUrl + 'auth/' + `${type}`, { headers: { Authorization: `Bearer ${this.getToken()}`}})
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user)
    .pipe(map(data => {
      console.log(data.user)
      this.currentUser.next(data.user)
    }));
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public logout(): void {
    this.currentUser.next(null);
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    this._notifService.success('Komunikat', 'Zostałeś wylogowany.')
  }

}
