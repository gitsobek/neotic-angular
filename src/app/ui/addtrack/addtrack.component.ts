import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { User } from 'src/app/core/models/User';
import { LocalAuthService, UserDetails } from 'src/app/core/authentication/localauth.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NotificationsService } from 'angular2-notifications';
import { slugify } from 'src/app/core/utils/slugify';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Song } from 'src/app/core/models/Song';
import { concatMap } from 'rxjs/operators';
import * as moment from 'moment';
import { RoutingState } from 'src/app/core/services/routing.service';
import { Router } from '@angular/router';
import {style, state, animate, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-addtrack',
  templateUrl: './addtrack.component.html',
  styleUrls: ['./addtrack.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0}))
      ])
    ])
  ]
})
export class AddtrackComponent implements OnInit {

  user: UserDetails;
  subscription$: Subscription;
  selectedFile: File;
  selectedSong: File;
  url = 'src/assets/img/default-image.png'
  widthOfImage = 500;
  heightOfImage = 300;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  private submitted: boolean = false;
  showLoadingIndicator = false;
  previousRoute: string;

  apiUrl = environment.apiUrl;

  uploadForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    artist: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
    genre: ['', Validators.required]
  });

  constructor(
    private authService: LocalAuthService,
    private fb: FormBuilder,
    private location: Location,
    private _notifService: NotificationsService,
    private http: HttpClient,
    private routingState: RoutingState,
    private router: Router) { }

  ngOnInit() {
    this.subscription$ = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  public get f() {
    return this.uploadForm.controls;
  }

  goBack(): void {
    this.location.back();
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = <File>event.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        var image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          if (image.width < 500 && image.height < 300) {
            this.widthOfImage = image.width;
            this.heightOfImage = image.height;
          } else if (image.width < 500) {
            this.widthOfImage = image.width;
          } else if (image.height < 300) {
            this.heightOfImage = image.height;
          } else {
            this.widthOfImage = 500;
            this.heightOfImage = 300;
          }
        }
      }
    }
  }

  onFileSelected2(event) {
    this.selectedSong = event.target.files[0];
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
      return true;
    } else {
      return false;
    }
  }

  validateSong(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'mp3' || ext.toLowerCase() == 'wav') {
      return true;
    } else {
      return false;
    }
  }

  removeSong() {
    this.selectedSong = null;
  }

  onSubmit() {
    if (!this.selectedFile || !this.selectedSong) {
      this._notifService.error('Komunikat', 'Brak wybranego pliku.');
    } else if (!this.validateFile(this.selectedFile.name)) {
      this._notifService.error('Komunikat', 'Niedozwolony format (dostępne: jpg/jpeg/png)');
    } else if (!this.validateSong(this.selectedSong.name)) {
      this._notifService.error('Komunikat', 'Niedozwolony format (dostępne: mp3/wav)');
    } else {
      this.submitted = true;

      if(this.uploadForm.invalid) {
        return;
      }

      this.showLoadingIndicator = true;

      var imageData = new FormData();
      var songData = new FormData();

      imageData.append('image', this.selectedFile, this.selectedFile.name);
      songData.append('track', this.selectedSong, this.selectedSong.name);

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');

      const HttpUploadOptions = {
        headers: new HttpHeaders({ "Accept": "application/json" })
      }

      var idOfSong;

      return this.http.post(this.apiUrl + `songs/${this.user._id}`, this.uploadForm.value)
        .pipe(
          concatMap((songData: any) => {
            idOfSong = songData.data._id;
            return this.http.post(this.apiUrl + `songs/uploadimage/${idOfSong}`, imageData, { headers: headers })
          }),
          concatMap(() => {
            return this.http.post(this.apiUrl + `tracks/analysis/${idOfSong}`, songData, HttpUploadOptions)
          })
        )
        .subscribe((res) => {
          this.showLoadingIndicator = false;
          this.previousRoute = this.routingState.getPreviousUrl();
          this.router.navigateByUrl(this.previousRoute);
          this._notifService.success('Komunikat', 'Utwór pomyślnie dodany.')
        }, (err) => {
          this.showLoadingIndicator = false;
          if(err.status === 400) {
            this._notifService.error('Komunikat', err.error.message);
          } else if(err.status === 478) {
            this._notifService.error('Komunikat', 'Nie możesz dodać kolejnego utworu. Kolejny raz: ' + moment(err.error.exp * 1000).locale("pl").format('LLL'));
          } else {
            this._notifService.error('Komunikat', 'Błąd serwera.');
          }
        })
    }
  }

  ngOnDestroy() {
    if(this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
