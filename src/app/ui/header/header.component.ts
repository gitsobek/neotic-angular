import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMobile;

  constructor(private deviceService: DeviceDetectorService,
    private _scrollToService: ScrollToService) {
    this.checkDeviceType();
   }

  ngOnInit() {}

  public triggerScrollToOffsetOnly(offset: number = 0) {

    const config: ScrollToConfigOptions = {
      offset
    };

    this._scrollToService.scrollTo(config);
  }

  public triggerScroll(destination: string) {
    if(this.isMobile) {
      const config: ScrollToConfigOptions = {
        target: destination,
        offset: -225
      };

      this._scrollToService.scrollTo(config);
    } else {
      const config: ScrollToConfigOptions = {
        target: destination,
        offset: -50
      };

      this._scrollToService.scrollTo(config);
    }
  }

  checkDeviceType() {
    if(this.deviceService.isMobile() || this.deviceService.isTablet())
      this.isMobile = true;
    else
      this.isMobile = false;
  }
}
