import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TokenPayload, LocalAuthService } from 'src/app/core/authentication/localauth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  private submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: LocalAuthService,
    private router: Router,
    private _notifService: NotificationsService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  public get f() {
    return this.registerForm.controls;
  }

  private register(credentials) {
    this.auth.register(credentials).subscribe(result => {
      this.router.navigateByUrl('/')
      this._notifService.success('Komunikat', result.message);
    }, (err) => {
      if(err.status === 409)
        this._notifService.error('Komunikat', err.error.message);
      else
        this._notifService.error('Komunikat', 'Błąd serwera.');
    })
  }

  onSubmit() {
    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.register(this.registerForm.value);
  }

}
