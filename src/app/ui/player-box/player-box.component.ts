import { Component, OnInit, Input } from '@angular/core';
import { Song } from 'src/app/core/models/Song';

@Component({
  selector: 'app-player-box',
  templateUrl: './player-box.component.html',
  styleUrls: ['./player-box.component.scss']
})
export class PlayerBoxComponent implements OnInit {

  @Input() song: Song;

  defaultImageUrl = '/assets/img/no-image.gif';

  constructor() { }

  ngOnInit() {
  }

  getImageUrl() {
    if(this.song && this.song.imageUrl) {
      return this.song.imageUrl;
    }
    return this.defaultImageUrl;
  }

}
