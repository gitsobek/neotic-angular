import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Song } from 'src/app/core/models/Song';
import { AudioService } from 'src/app/core/services/audio.service';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { fromEvent, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserDetails, LocalAuthService } from 'src/app/core/authentication/localauth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-player-box-complex',
  templateUrl: './player-box-complex.component.html',
  styleUrls: ['./player-box-complex.component.scss']
})
export class PlayerBoxComplexComponent implements OnInit, AfterViewInit {

  @Input() song: Song;
  @Input() masterArray : Song[];
  @Input("show-add") showAdd: boolean;
  @Input("show-delete") showDelete: boolean;
  @Input("show-like") showLike: boolean;
	@Input("show-dislike") showDislike: boolean;
  @ViewChild('mySeeker') mySeeker: ElementRef;

  @Output() deleteSong = new EventEmitter<any>();
  @Output() addSong = new EventEmitter<any>();
  // @Output() deleteLike = new EventEmitter<any>();
  // @Output() addLike = new EventEmitter<any>();

  whoami: UserDetails;
  subscription$: Subscription;
  subscriptionRoute$: Subscription;
  duration;
  onSeekState: boolean;
  isProfilePage: boolean;

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
    private authService: LocalAuthService,
    private http: HttpClient,
    private router: Router) {
  }

  ngOnInit() {
    this.subscription$ = this.authService.user.subscribe(user => {
      this.whoami = user;
    });
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

  addToPlaylist(song) {
    this.addSong.next(song);
    return this.http.post(this.apiUrl + `songs/${song._id}/addplaylist/${this.whoami._id}`, { headers: { 'content-type': 'application-json'}})
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }

  deleteSongFromPlaylist(song) {
    this.deleteSong.next(song);
    return this.http.post(this.apiUrl + `songs/${song._id}/removeplaylist/${this.whoami._id}`, { headers: { 'content-type': 'application-json'}})
    .subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  addLike(song) {
    this.whoami['liked'].push(song._id);
  }

  deleteLike(song) {
    var index = this.whoami['liked'].indexOf(song._id);
    if (index !== -1) {
      this.whoami['liked'].splice(index, 1);
    }
  }

  likeExists(song) {
    return this.whoami['liked'].indexOf(song._id) > -1
  }

  isSongLikedMethod(song) {
    if (this.likeExists(song)) {
      return true;
    } else {
      return false;
    }
  }

  addToLiked(song) {
    return this.http.post(this.apiUrl + `songs/${song._id}/addliked/${this.whoami._id}`, { headers: { 'content-type': 'application-json'}})
    .subscribe((res) => {
      this.addLike(song);
    }, (err) => {
      console.log(err);
    });
  }

  deleteSongFromLiked(song) {
    return this.http.post(this.apiUrl + `songs/${song._id}/removeliked/${this.whoami._id}`, { headers: { 'content-type': 'application-json'}})
    .subscribe((res) => {
      // this.deleteLike.next(song);
      this.deleteLike(song);
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
    if (this.subscription$)
      this.subscription$.unsubscribe();
    this._audioService.pause();
    this._audioService.deleteAllSongs();
  }

}
