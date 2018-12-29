import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter, concatMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userrank-dialog',
  templateUrl: './userrank-dialog.component.html',
  styleUrls: ['./userrank-dialog.component.scss']
})
export class UserrankDialogComponent implements OnInit, OnDestroy {

  form: FormGroup;
  user: User;
  rank$: Subscription;

  apiUrl = environment.apiUrl;

  @ViewChild('saveButton') saveButton: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserrankDialogComponent>,
    @Inject(MAT_DIALOG_DATA) user: User) {
      this.user = user;
      this.form = fb.group({
        rank: [user.rank, Validators.required],
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
    return fromPromise(fetch(this.apiUrl + `users/${this.user._id}/rank`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }

  save() {
    this.rank$ = this.saveUserRank(this.form.value)
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
    if(this.rank$)
      this.rank$.unsubscribe();
  }

}
