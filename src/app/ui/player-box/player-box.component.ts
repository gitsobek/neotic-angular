import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Song } from 'src/app/core/models/Song';
import { AudioService } from 'src/app/core/services/audio.service';

@Component({
  selector: 'app-player-box',
  templateUrl: './player-box.component.html',
  styleUrls: ['./player-box.component.scss'],
  providers: []
})
export class PlayerBoxComponent implements OnInit, OnDestroy {

  @Input() song: Song;

  defaultImageUrl = '/assets/img/no-image.gif';

  constructor(public _audioService: AudioService) {
  }

  ngOnInit() {}

  playSong() {
    this._audioService.play(this.song.slug);
  }

  stopSong() {
    this._audioService.pause();
  }

  getImageUrl() {
    if(this.song && this.song.imageUrl) {
      return this.song.imageUrl;
    }
    return this.defaultImageUrl;
  }

  ngOnDestroy() {
    this._audioService.pause();
  }

}
