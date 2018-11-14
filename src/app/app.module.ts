import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MaterialModule } from './material.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { UiModule } from './ui/ui.module';
import { AppComponent } from './app.component';
import { NeoticService } from './core/http/neotic.service';
import { AudioService } from './core/services/audio.service';
import { SongsService } from './core/services/songs.service';
import { RadioService } from './core/http/radio.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiModule,
    DeviceDetectorModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    ScrollToModule.forRoot(),
    MaterialModule
  ],
  providers: [
    AudioService,
    NeoticService,
    SongsService,
    RadioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
