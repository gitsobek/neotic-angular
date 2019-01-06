import { Injectable } from '@angular/core';
import { NeoticService } from '../http/neotic.service';

@Injectable()
export class AudioService {

  public audios: Array<any> = [];

  constructor(private _neoticApiService: NeoticService) {
  }

  private load(url, audio): void {
    audio.src = this._neoticApiService.getStreamById(url);
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

  public deleteAllSongs(): void {
    this.audios = [];
  }

}
