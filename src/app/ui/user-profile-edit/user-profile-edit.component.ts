import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { Subscription, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/core/services/users.service';
import { createHttpObservable } from 'src/app/core/utils/data';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { matchOtherValidator } from 'src/app/core/utils/confirm-password';
import { LocalAuthService } from 'src/app/core/authentication/localauth.service';
import { DataService } from 'src/app/core/services/data.service';
import { Song } from 'src/app/core/models/Song';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileEditComponent implements OnInit {

  @Input() user: User;
  uploaded: Song[];
  playlist: Song[];
  liked: Song[];
  subscription$: Subscription;
  subForId$: Subscription;
  selectedFile: File;
  id: String
  url;

  showLike = 4;
  showUpload = 4;
  showPlaylist = 4;

  public warns: Array<String>;
  private submitted: boolean = false;

  apiUrl = environment.apiUrl;

  passwordForm = this.fb.group({
    passwordAct: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    passwordNew: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), matchOtherValidator('passwordNew')]]
  });

  constructor(
    private route: ActivatedRoute,
    private _userService: UsersService,
    private _authService: LocalAuthService,
    private location: Location,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private _notifService: NotificationsService,
    private data: DataService
  ) { }

  public get f() {
    return this.passwordForm.controls;
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): Observable<User> {
    this.subForId$ = this.data.currentId.subscribe(res => this.id = res)
    return createHttpObservable(this.apiUrl + `users/${this.id}`)
      .pipe(
        map(res => res['data'])
      )
      .subscribe(user => {
        this.user = user
        this.uploaded = user.uploaded;
        this.playlist = user.playlist;
        this.liked = user.liked;
        this.warns = user.warns;
        this.url = user.avatarUrl;
      })
  }

  goBack(): void {
    this.location.back();
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        var image = new Image();
        image.src = event.target.result;
      }
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
      return true;
    } else {
      return false;
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      this._notifService.error('Komunikat', 'Brak wybranego pliku.')
    } else if (!this.validateFile(this.selectedFile.name)) {
      this._notifService.error('Komunikat', 'Niedozwolony format (dostępne: jpg/jpeg/png)');
    } else {
      var fd = new FormData();
      const avatarName = this.user.name + '.' + this.selectedFile.name.split('.')[1];
      fd.append('image', this.selectedFile, avatarName);

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');

      this.http.post(this.apiUrl + `users/${this.user._id}/uploadavatar`, fd, { headers: headers })
        .subscribe((res) => {
          this.selectedFile = null;
          window.location.reload();
        }, (err) => {
          this._notifService.error('Komunikat', 'Błąd uploadu!');
        })
    }
  }

  onSubmit() {
    this.submitted = true;

    if(this.passwordForm.invalid) {
      return;
    }

    this._authService.changePassword(this.user._id, this.passwordForm.value);
  }

  deleteSong(event) {
    var index = this.playlist.indexOf(event);
    this.playlist.splice(index, 1);
  }

  removeSong(event) {
    var index = this.uploaded.indexOf(event);
    this.uploaded.splice(index, 1);

    var indexInPlaylist = this.playlist.findIndex(obj => obj._id == event._id);
    var indexInLiked = this.liked.findIndex(obj => obj._id == event._id);

    if (indexInPlaylist > -1) {
      this.playlist.splice(indexInPlaylist, 1);
    }

    if (indexInLiked > -1) {
      this.liked.splice(indexInLiked, 1);
    }
  }

  increaseShowLiked() {
    this.showLike += 4;
  }

  increaseShowUploaded() {
    this.showUpload += 4;
  }

  increaseShowPlaylist() {
    this.showPlaylist += 4;
  }

  ngOnDestroy() {
    if(this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
