import { Component } from '@angular/core';
import { LocalAuthService } from './core/authentication/localauth.service';
import { RoutingState } from './core/services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'neotic-app';

  public options = {
    position: ["middle", "right"],
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    lastOnBottom: false
  }

  constructor(
    authService: LocalAuthService,
    routingState: RoutingState
  ) {
    authService.getMyProfile();
    routingState.loadRouting();
  }
}
