import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalAuthService } from 'src/app/core/authentication/localauth.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isMobile: boolean;
  isLoginPage: boolean;
  isAdmin: boolean;
  isUser: boolean;

  private subscription: Subscription;

  public logged = [
    {
      title: 'Panel administratora',
      href: '/options'
    }
  ];

  constructor(
    private deviceService: DeviceDetectorService,
    private _scrollToService: ScrollToService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: LocalAuthService,
    private data: DataService
    ) {
      this.checkDeviceType();
   }

  ngOnInit() {
    this.subscription = this.router.events.subscribe(data => {
      if(data instanceof NavigationEnd) {
        if(data.url.includes('/login') || data.url.includes('/register')) {
          this.isLoginPage = true;
        } else {
          this.isLoginPage = false;
        }
      }
    })
  }

  public triggerScrollToOffsetOnly(offset: number = 0) {

    const config: ScrollToConfigOptions = {
      offset
    };

    this._scrollToService.scrollTo(config);
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

  checkDeviceType() {
    if(this.deviceService.isMobile() || this.deviceService.isTablet())
      this.isMobile = true;
    else
      this.isMobile = false;
  }

  sendInfo(id) {
    this.data.sendData(id);
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
