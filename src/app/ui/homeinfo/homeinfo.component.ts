import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-homeinfo',
  templateUrl: './homeinfo.component.html',
  styleUrls: ['./homeinfo.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide', style({
        opacity: 0,
        transform: "translateX(-25%)"
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ]),
    trigger('scrollAnimation2', [
      state('show', style({
        opacity: 1,
      })),
      state('hide',   style({
        opacity: 0,
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ]),
    trigger('scrollAnimation3', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateX(25%)"
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ])
  ]
})
export class HomeinfoComponent implements OnInit {

  state = 'hide'
  isMobile: boolean;

  constructor(
    private el: ElementRef,
    private deviceService: DeviceDetectorService) {
    this.checkDeviceType();
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= componentPosition * 0.6) {
      this.state = 'show';
    } else {
      this.state = 'hide';
    }
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
