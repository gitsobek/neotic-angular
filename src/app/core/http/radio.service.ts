import { Injectable } from '@angular/core';
import { Radio } from '../models/Radio';
import { Radios } from '../models/Radio';
import { Observable, of } from 'rxjs';

@Injectable()
export class RadioService {

  constructor() {}

  getRadioStations(): Observable<Radio[]> {
    return of(Radios);
  }

}


