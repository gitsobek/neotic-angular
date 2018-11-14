import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Song } from '../models/Song'

@Injectable()
export class SongsService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTrendingSongs(genre: string): Observable<Song[]> {
    var uri = this.filterByGenres(genre);
    return this.http.get(uri)
      .pipe(
        map(res => this.handleResponse(res))
      )
  }

  handleResponse(res: any): any {
    var data = res;
    var result = [];
    if(data) {
      data.data.forEach(item => {
        var song: Song = <Song>{};
        song.id = item._id;
        song.slug = item.slug;
        song.title = item.title;
        song.artist = item.artist;
        song.imageUrl = item.imageUrl;
        song.duration = item.duration;
        result.push(song);
      });
    }
    return result;
  }

  handleError() {

  }

  filterByGenres(keyword: string) : string {
    return 'http://localhost:3000/songs?genre=' + keyword;
  }
}
