import { Component, OnInit, Input } from '@angular/core';
import { Song } from 'src/app/core/models/Song';
import { AudioService } from 'src/app/core/services/audio.service';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-player-box-complex',
  templateUrl: './player-box-complex.component.html',
  styleUrls: ['./player-box-complex.component.scss']
})
export class PlayerBoxComplexComponent implements OnInit {

  @Input() song: Song;

  defaultImageUrl = '/assets/img/no-image.gif';
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 50;
  vertical = false;

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  constructor(public _audioService: AudioService) {
  }

  ngOnInit() {}

  playSong() {
    this._audioService.play(this.song.slug);
  }

  stopSong() {
    this._audioService.pause();
  }

  muteSong() {
    this._audioService.mute(this.song.slug);
  }

  pitch(event: any) {
    this._audioService.changeVolume(event.value, this.song.slug);
  }

  getImageUrl() {
    if(this.song && this.song.imageUrl) {
      return this.song.imageUrl;
    }
    return this.defaultImageUrl;
  }

  ngOnDestroy() {
    this._audioService.pause();
    this._audioService.deleteAllSongs();
  }

}
