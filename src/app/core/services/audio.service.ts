import { Injectable } from '@angular/core';
import { NeoticService } from '../http/neotic.service';
import * as moment from 'moment';

@Injectable()
export class AudioService {

  public audios: Array<any> = [];
  public metadata: Array<any> = [];
  public metadataNotFormatted: Array<any> = [];

  constructor(private _neoticApiService: NeoticService) {
  }

  private load(url, audio): void {
    audio.src = this._neoticApiService.getFullStreamById(url);
    audio.load();
  }

  public async play(url): Promise<any> {

    this.pause();

    if(!this.audios[url]) {
      this.audios[url] = new Audio();
      await this.load(url, this.audios[url]);
      this.audios[url].volume = 0.5
    }
    this.audios[url].play();
    this.audios[url].addEventListener("timeupdate", (currentTime) => {
      this.updateCurrentTime(url);
      this.updateSeeker(url);
    });
    this.audios[url].onloadedmetadata = () => {
      this.metadata[url] = moment.utc(this.audios[url].duration * 1000).format("mm:ss");
      this.metadataNotFormatted[url] = this.audios[url].duration;
    };
  }

  public pause(): void {
    Object.keys(this.audios).forEach(audio => {
      this.audios[audio].pause()
    });
  }

  public mute(url): void {
    if (this.audios[url]) {
      if (this.audios[url].muted) {
        this.audios[url].muted = false;
      } else {
        this.audios[url].muted = true;
      }
    }
  }

  public changeVolume(volume, url): void {
    volume = volume / 100;
    if (volume === 0) {
      this.audios[url].muted = true;
    } else {
      this.audios[url].muted = false;
    }
    this.audios[url].volume = volume;
  }

  public updateCurrentTime(url) {
    return moment.utc(this.audios[url].currentTime * 1000).format("mm:ss");
  }

  public updateSeeker(url) {
    var time = this.audios[url].currentTime * (100 / this.audios[url].duration);
    return time;
  }

  public seek(url, time) {
    this.audios[url].currentTime = time;
  }

  public isAudioPlaying(url) {
    return this.audios[url]
      && this.audios[url].currentTime > 0
      && !this.audios[url].paused
      && !this.audios[url].ended
      && this.audios[url].readyState > 2;
  }

  public deleteAllSongs(): void {
    this.audios = [];
  }

}
