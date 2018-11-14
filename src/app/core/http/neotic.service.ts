import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NeoticService {

  constructor(private http: HttpClient) {}

  get(idOfSong: string) {
    var uri = this.getStreamById(idOfSong);
    return this.http.get(uri);
  }

  getStreamById(keyword: string) : string {
    return 'http://localhost:3000/tracks/' + keyword;
  }

}
