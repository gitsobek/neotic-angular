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

@Component({
  selector: 'app-user-profile-display',
  templateUrl: './user-profile-display.component.html',
  styleUrls: ['./user-profile-display.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileDisplayComponent implements OnInit, OnDestroy {

  @Input() user: User;
  whoami: UserDetails;
  subscription$: Subscription;

  public warns: Array<String>;

  apiUrl = environment.apiUrl;

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
        this.warns = user.warns
      })
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    if(this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
