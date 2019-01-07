import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userwarn-dialog',
  templateUrl: './userwarn-dialog.component.html',
  styleUrls: ['./userwarn-dialog.component.scss']
})
export class UserwarnDialogComponent implements OnInit, OnDestroy {

  form: FormGroup;
  user: User;
  warn$: Subscription;

  apiUrl = environment.apiUrl;

  @ViewChild('saveButton') saveButton: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserwarnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) user: User) {
      this.user = user;
      this.form = fb.group({
        type: [Validators.required],
        message: []
      });
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        tap(changes => this.saveUserRank(changes))
      )
  }

  saveUserRank(changes) {
    if(Object.values(changes)[0] == 'warn') {
      return fromPromise(fetch(this.apiUrl + `users/${this.user._id}/warn`, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      }));
    } else {
      return fromPromise(fetch(this.apiUrl + `users/${this.user._id}/ban`, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      }));
    }
  }

  save() {
    this.saveUserRank(this.form.value)
      .subscribe(() => {
        this.close();
        window.location.reload();
      },
      (err) => console.log('Error: ' + err)
    );
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if(this.warn$)
      this.warn$.unsubscribe();
  }

}
