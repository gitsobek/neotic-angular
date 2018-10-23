import { Component, OnInit } from '@angular/core';
import { MailnotificationService } from 'src/app/core/services/mailnotification.service';
import 'bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-imageslider',
  templateUrl: './imageslider.component.html',
  styleUrls: ['./imageslider.component.scss'],
  providers: [MailnotificationService]
})
export class ImagesliderComponent implements OnInit {

  constructor(private _mailService: MailnotificationService) { }

  ngOnInit() {}

  pauseCarousel() {
    $("#slides").carousel('pause');
  }

  addEmail(email) {
    this._mailService.sendEmailAdress(email);
  }

}
