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
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angular-6-social-login";
import { UiModule } from './ui/ui.module';
import { AppComponent } from './app.component';
import { NeoticService } from './core/http/neotic.service';
import { AudioService } from './core/services/audio.service';
import { SongsService } from './core/services/songs.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { LocalAuthService } from './core/authentication/localauth.service';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { UserrankDialogComponent } from './ui/userrank-dialog/userrank-dialog.component';
import { UserwarnDialogComponent } from './ui/userwarn-dialog/userwarn-dialog.component';
import { UsersService } from './core/services/users.service';
import { RouteGuardService } from './core/guards/route-guard.service';
import { DataService } from './core/services/data.service';
import { RoutingState } from './core/services/routing.service';
import { SongdeletedialogComponent } from './ui/songdeletedialog/songdeletedialog.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("352511158269-lj7ciul6sc40dl1vrqk5cctt8j4bu88n.apps.googleusercontent.com")
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    UserrankDialogComponent,
    UserwarnDialogComponent,
    SongdeletedialogComponent
  ],
  imports: [
    SocialLoginModule,
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
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    LocalAuthService,
    AudioService,
    NeoticService,
    SongsService,
    UsersService,
    DataService,
    RoutingState,
    AuthGuardService,
    RouteGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserrankDialogComponent,
    UserwarnDialogComponent,
    SongdeletedialogComponent
  ]
})

export class AppModule { }
