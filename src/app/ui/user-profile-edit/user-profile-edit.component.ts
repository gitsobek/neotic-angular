import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { Subscription, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {

  @Input() user: User;
  subscription$: Subscription;
  subForId$: Subscription;
  selectedFile: File;
  id: String

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
    // const id = this.route.snapshot.paramMap.get('id');
    this.subForId$ = this.data.currentId.subscribe(res => this.id = res)
    return createHttpObservable(this.apiUrl + `users/${this.id}`)
      .pipe(
        map(res => res['data'])
      )
      .subscribe(user => {
        this.user = user
        this.warns = user.warns
      })
  }

  goBack(): void {
    this.location.back();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
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

  ngOnDestroy() {
    if(this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
