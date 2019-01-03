import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private myValue = JSON.parse(window.localStorage.getItem('myData'));
  private idSource = new BehaviorSubject(this.myValue);
  currentId = this.idSource.asObservable();

  constructor() {}

  sendData(id: string) {
    if (!window.localStorage.getItem('myData'))
      window.localStorage.setItem('myData', JSON.stringify(id));
    this.idSource.next(id);
  }

}
