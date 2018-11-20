import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    alert('yeeeeaaah');
  }
}
