import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/core/models/Song';
import { SongsService } from 'src/app/core/services/songs.service';

@Component({
  selector: 'app-musicdemo',
  templateUrl: './musicdemo.component.html',
  styleUrls: ['./musicdemo.component.scss'],
  providers: [SongsService]
})
export class MusicdemoComponent implements OnInit {

  songs: Song[];
  genre = 'edm'

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

  ngOnDestroy() {
    this.songs$.unsubscribe();
  }
}
