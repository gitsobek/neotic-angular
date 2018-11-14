import { Injectable } from '@angular/core';
import { NeoticService } from '../http/neotic.service';
import { Radios } from '../../core/models/Radio';

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
    }

    this.audios[url].play();

  }

  public pause(): void {
    Object.keys(this.audios).forEach(audio => {
      this.audios[audio].pause()
    });
  }

  public deleteAllSongs(): void {
    this.audios = [];
  }

}
