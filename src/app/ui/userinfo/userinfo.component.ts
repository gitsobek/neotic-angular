import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { createHttpObservable } from 'src/app/core/utils/data'
import { environment } from 'src/environments/environment';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap, tap, share, shareReplay, publishLast, refCount, takeUntil } from 'rxjs/operators';
import { Observable, fromEvent, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UserrankDialogComponent } from '../userrank-dialog/userrank-dialog.component';
import { UserwarnDialogComponent } from '../userwarn-dialog/userwarn-dialog.component';
import { fromPromise } from 'rxjs/internal-compatibility';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit, AfterViewInit {

  @Input()
  users: User[];

  users$: Observable<User[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('searchInput') input: ElementRef;

  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private _notifService: NotificationsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.users$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(input => this.loadUsers(input))
      )
  }

  loadUsers(search = ''): Observable<User[]> {
    return createHttpObservable(this.apiUrl + 'users?filter=' + search + '&sort_by=role&order_by=asc')
      .pipe(
        map(res => res["data"])
      )
  }

  onValChange(value) {
    this.users$ = createHttpObservable(this.apiUrl + `users?sort_by=`+value+`&order_by=${value==='warns' ? 'desc' : 'asc'}`)
      .pipe(
        map(res => res["data"])
      )
  }

  changeUserRank(user: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = user;

    const dialogRef = this.dialog.open(UserrankDialogComponent, dialogConfig);
  }

  addWarning(user: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = user;

    const dialogRef = this.dialog.open(UserwarnDialogComponent, dialogConfig);
  }

  unbanUser(user: User) {
    return this.http.delete(this.apiUrl + `users/${user._id}/unban`, { headers: { 'content-type': 'application-json'}})
      .subscribe(() => {
        window.location.reload();
        this._notifService.success('Komunikat', 'Użytkownik odbanowany.');
      },
      (err) => console.log('Error: ' + err)
    );
  }

}
