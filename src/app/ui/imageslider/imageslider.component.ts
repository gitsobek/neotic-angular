import { Component, OnInit, ViewChild } from '@angular/core';
import { MailnotificationService } from 'src/app/core/services/mailnotification.service';
import { NotificationsService } from 'angular2-notifications';

import 'bootstrap';
import * as $ from 'jquery';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-imageslider',
  templateUrl: './imageslider.component.html',
  styleUrls: ['./imageslider.component.scss'],
  providers: [MailnotificationService]
})
export class ImagesliderComponent implements OnInit {

  constructor(
    private _mailService: MailnotificationService,
    private _notifService: NotificationsService,
    private _scrollToService: ScrollToService) { }

  ngOnInit() {}

  pauseCarousel() {
    $("#slides").carousel('pause');
  }

  addEmail(email, f) {
    this._mailService.sendEmailAdress(email).subscribe(result => {
      this._notifService.success('Komunikat', 'Mail został dodany.');
      f.resetForm();
    }, err => {
      if(err.status === 500 || err.status === 0)
        this._notifService.error('Komunikat', 'Podany mail już istnieje.');
      else
        this._notifService.error('Komunikat', 'Błąd serwera');
    });
  }

  public triggerScroll(destination: string) {
    // if(this.isMobile) {
    //   const config: ScrollToConfigOptions = {
    //     target: destination,
    //     offset: -75
    //   };

    //   this._scrollToService.scrollTo(config);
    // } else {
      const config: ScrollToConfigOptions = {
        target: destination,
        offset: -50
      };

      this._scrollToService.scrollTo(config);

  }
}
