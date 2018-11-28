import { Component } from '@angular/core';
import { AuthService } from './core/authentication/auth.service';

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

  constructor(authService: AuthService) {
    authService.getMyProfile();
  }
}
