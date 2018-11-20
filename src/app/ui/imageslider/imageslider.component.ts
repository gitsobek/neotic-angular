import { Component, OnInit, ViewChild } from '@angular/core';
import { MailnotificationService } from 'src/app/core/services/mailnotification.service';
import { NotificationsService } from 'angular2-notifications';

import 'bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-imageslider',
  templateUrl: './imageslider.component.html',
  styleUrls: ['./imageslider.component.scss'],
  providers: [MailnotificationService]
})
export class ImagesliderComponent implements OnInit {

  constructor(
    private _mailService: MailnotificationService,
    private _service: NotificationsService) { }

  ngOnInit() {}

  pauseCarousel() {
    $("#slides").carousel('pause');
  }

  addEmail(email) {
    this._mailService.sendEmailAdress(email).subscribe(result => {
      this._service.success('Komunikat', 'Mail został dodany.');
    }, err => {
      if(err.status === 500 || err.status === 0)
        this._service.error('Komunikat', 'Błąd serwera.');
      else
        this._service.error('Komunikat', 'Podany mail już istnieje.');
    });
  }
}
