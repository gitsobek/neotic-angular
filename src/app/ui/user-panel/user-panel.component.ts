import { Component, OnInit } from '@angular/core';
import { UserDetails, LocalAuthService } from 'src/app/core/authentication/localauth.service';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  whoami: UserDetails;
  subscription$: Subscription;

  constructor(
    private authService: LocalAuthService,
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
