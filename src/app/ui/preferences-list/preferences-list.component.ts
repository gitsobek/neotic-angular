import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, OnDestroy } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { LocalAuthService, UserDetails } from 'src/app/core/authentication/localauth.service';
import { Subscription, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song } from 'src/app/core/models/Song';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-preferences-list',
  templateUrl: './preferences-list.component.html',
  styleUrls: ['./preferences-list.component.scss']
})
export class PreferencesListComponent implements OnInit, OnDestroy {

  @Input() songs: Song[];
  songs$: Observable<Song[]>;
  whoami: UserDetails;
  subscription$: Subscription;

  isDisable = true;
  showLoadingIndicator = false;
  currentTime: String = '';
  currentType: String = '';
  currentMood: String = '';

  apiUrl = environment.apiUrl;

  constructor(
    private _notifService: NotificationsService,
    private authService: LocalAuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.subscription$ = this.authService.user.subscribe(user => {
      this.whoami = user;
      this.sendData();
    });
  }

  choseCard(value) {
    if (value === 'short' || value === 'long') {
      if (!this.currentTime) {
        this.currentTime = value;
      } else if (this.currentTime === value) {
        this.currentTime = '';
      } else {
        this._notifService.warn('Komunikat', 'Najpierw odznacz zaznaczoną kartę.');
      }
    }

    if (value === 'instrumental' || value === 'dance' || value === 'guitar' || value === 'party') {
      if (!this.currentType) {
        this.currentType = value;
      } else if (this.currentType === value) {
        this.currentType = '';
      } else {
        this._notifService.warn('Komunikat', 'Najpierw odznacz zaznaczoną kartę.');
      }
    }

    if (value === 'relax' || value === 'easy' || value === 'energy') {
      if (!this.currentMood) {
        this.currentMood = value;
      } else if (this.currentMood === value) {
        this.currentMood = '';
      } else {
        this._notifService.warn('Komunikat', 'Najpierw odznacz zaznaczoną kartę.');
      }
    }

    if (this.currentTime && this.currentType && this.currentMood) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
  }

  sendData() {
    var objectToSend = {
      time: this.currentTime,
      type: this.currentType,
      mood: this.currentMood,
      _user: this.whoami._id
    }

    this.http.post(this.apiUrl + 'songs/findpreference', objectToSend)
      .pipe(
        map(res => res["data"])
      )
      .subscribe((filteredSongs: any) => {
        console.log(filteredSongs);
        this.songs = filteredSongs;
      }, (err) => {
        this.showLoadingIndicator = false;
        if(err.status === 400) {
          this._notifService.error('Komunikat', err.error.message);
        } else {
          this._notifService.error('Komunikat', 'Błąd serwera.');
        }
      })
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
