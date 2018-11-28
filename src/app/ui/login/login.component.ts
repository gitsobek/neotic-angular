import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenPayload, AuthService } from 'src/app/core/authentication/auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private _notifService: NotificationsService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  public get f() {
    return this.loginForm.controls;
  }

  login(credentials) {
    this.auth.login(credentials).subscribe(() => {
      this.router.navigateByUrl('/');
      this._notifService.success('Komunikat', 'Zostałeś zalogowany.');
    }, (err) => {
      if(err.status === 401) {
        this._notifService.error('Komunikat', err.error.message);
      }
      else {
        this._notifService.error('Komunikat', 'Błąd serwera.');
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.login(this.loginForm.value);
  }
}
