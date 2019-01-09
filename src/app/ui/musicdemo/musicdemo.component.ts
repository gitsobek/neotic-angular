import { Component, OnInit, OnDestroy } from '@angular/core';
import { Song } from 'src/app/core/models/Song';
import { SongsService } from 'src/app/core/services/songs.service';
import { MatTabChangeEvent } from '@angular/material';
import { AudioService } from 'src/app/core/services/audio.service';

@Component({
  selector: 'app-musicdemo',
  templateUrl: './musicdemo.component.html',
  styleUrls: ['./musicdemo.component.scss'],
  providers: []
})
export class MusicdemoComponent implements OnInit, OnDestroy {

  songs: Song[];
  genre = 'rap'

  private songs$;

  constructor(
    private _songsService: SongsService,
    private _audioService: AudioService
  ) {}

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
      this.genre = 'chill';
      this.getSongs();
    } else if (event.index == 2) {
      this.genre = 'funk';
      this.getSongs();
    } else if (event.index == 3) {
      this.genre = 'rock';
      this.getSongs();
    }
  }

  ngOnDestroy() {
    this.songs$.unsubscribe();
    this._audioService.deleteAllSongs();
  }

}
