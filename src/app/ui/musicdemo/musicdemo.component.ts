import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/core/models/Song';
import { SongsService } from 'src/app/core/services/songs.service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-musicdemo',
  templateUrl: './musicdemo.component.html',
  styleUrls: ['./musicdemo.component.scss'],
  providers: [SongsService]
})
export class MusicdemoComponent implements OnInit {

  songs: Song[];
  genre = 'rap'

  private songs$;

  constructor(private _songsService: SongsService) {}

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.songs$ = this._songsService.getTrendingSongs(this.genre)
      .subscribe(songs => {
        this.songs = songs;
    });
  }

  onLinkClick(event: MatTabChangeEvent) {
    if(event.index == 0) {
      this.genre = 'rap';
      this.getSongs();
    } else if (event.index == 1) {
      this.genre = 'edm';
      this.getSongs();
    }
  }

  ngOnDestroy() {
    this.songs$.unsubscribe();
  }

}
