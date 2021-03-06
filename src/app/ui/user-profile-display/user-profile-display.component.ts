import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/core/services/users.service';
import { createHttpObservable } from 'src/app/core/utils/data';
import { Observable, Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { LocalAuthService, UserDetails } from 'src/app/core/authentication/localauth.service';
import { Song } from 'src/app/core/models/Song';

@Component({
  selector: 'app-user-profile-display',
  templateUrl: './user-profile-display.component.html',
  styleUrls: ['./user-profile-display.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileDisplayComponent implements OnInit, OnDestroy {

  @Input() user: User;
  uploaded: Song[];
  playlist: Song[];
  liked: Song[];
  whoami: UserDetails;
  subscription$: Subscription;

  public warns: Array<String>;

  apiUrl = environment.apiUrl;
  showLike = 4;
  showUpload = 4;
  showPlaylist = 4;

  constructor(
    private route: ActivatedRoute,
    private _userService: UsersService,
    private location: Location,
    private authService: LocalAuthService
  ) { }

  ngOnInit() {
    this.getUser();
    this.subscription$ = this.authService.user.subscribe(user => {
      this.whoami = user;
    });
  }

  getUser(): Observable<User> {
    const id = this.route.snapshot.paramMap.get('id');
    return createHttpObservable(this.apiUrl + `users/${id}`)
      .pipe(
        map(res => res['data'])
      )
      .subscribe(user => {
        this.user = user
        this.uploaded = user.uploaded;
        this.playlist = user.playlist;
        this.liked = user.liked;
        this.warns = user.warns
      })
  }

  goBack(): void {
    this.location.back();
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
