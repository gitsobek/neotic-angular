import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalAuthService } from '../authentication/localauth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private auth: LocalAuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
