import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  private submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  public get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    alert('yeeeeaaah');
  }

}
