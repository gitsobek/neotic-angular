import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { LocalAuthService } from "../authentication/localauth.service";
import { take, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: LocalAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<any> {

    return this.auth.user
      .pipe(
        take(1),
        map(user => {
          if(user && user.role === route.data.role) {
            return true;
          } else {
            if(user && user.role === 'admin') {
              this.router.navigateByUrl('/admin');
            } else if(user && user.role === 'user') {
              this.router.navigateByUrl('/user');
            } else {
              this.router.navigateByUrl('/');
            }
            return false;
          }
        })
      )
  }

}
