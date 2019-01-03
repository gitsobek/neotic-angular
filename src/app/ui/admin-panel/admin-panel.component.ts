import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalAuthService, UserDetails } from 'src/app/core/authentication/localauth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  whoami: UserDetails;
  subscription$: Subscription;

  constructor(
    private authService: LocalAuthService,
    private router: Router,
    private data: DataService) { }

  ngOnInit() {
    this.subscription$ = this.authService.user.subscribe(user => {
      this.whoami = user;
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  sendInfo() {
    this.data.sendData(this.whoami._id);
  }

}
