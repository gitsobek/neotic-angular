import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { AuthService } from './core/authentication/auth.service';
import { TokenInterceptor } from './core/interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    AudioService,
    NeoticService,
    SongsService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
