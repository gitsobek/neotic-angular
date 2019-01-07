import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Song } from 'src/app/core/models/Song';
import { AudioService } from 'src/app/core/services/audio.service';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player-box-complex',
  templateUrl: './player-box-complex.component.html',
  styleUrls: ['./player-box-complex.component.scss']
})
export class PlayerBoxComplexComponent implements OnInit, AfterViewInit {

  @Input() song: Song;
  @ViewChild('mySeeker') mySeeker: ElementRef;
  duration;
  onSeekState: boolean;

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

  apiUrl = environment.apiUrl;

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  constructor(
    public _audioService: AudioService,
    private http: HttpClient) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

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

  onSeekStart(event) {
    this.onSeekState = this._audioService.isAudioPlaying(this.song.slug);
    if (this.onSeekState) {
      this.stopSong();
    }
  }

  onSeekEnd(event) {
    if (this.onSeekState) {
      var newValue = event.clientX - this.mySeeker.nativeElement.offsetLeft;
      var seekTo = this._audioService.metadataNotFormatted[this.song.slug] * (this.mySeeker.nativeElement.value / 100);
      this._audioService.seek(this.song.slug, seekTo);
      this.playSong();
    } else {
      var newValue = event.clientX - this.mySeeker.nativeElement.offsetLeft;
      this.mySeeker.nativeElement.value = newValue * (this._audioService.metadataNotFormatted[this.song.slug] / 100);
      this._audioService.seek(this.song.slug, seekTo);
    }
  }

  addToPlaylist(idOfSong) {
    return this.http.post(this.apiUrl + `songs/addplaylist/${idOfSong}`, { headers: { 'content-type': 'application-json'}})
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
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
