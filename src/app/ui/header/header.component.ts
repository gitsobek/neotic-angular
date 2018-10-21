import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMobile;

  constructor(private deviceService: DeviceDetectorService) {
    this.checkDeviceType();
   }

  ngOnInit() {
  }

  checkDeviceType() {
    if(this.deviceService.isMobile() || this.deviceService.isTablet())
      this.isMobile = true;
    else
      this.isMobile = false;
  }
}
