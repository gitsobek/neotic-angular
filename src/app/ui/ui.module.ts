import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesliderComponent } from './imageslider/imageslider.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeinfoComponent } from './homeinfo/homeinfo.component';
import { MusicdemoComponent } from './musicdemo/musicdemo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { PlayerBoxComponent } from './player-box/player-box.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { GoogleAccountPipe } from '../core/pipes/googleAccount';
import { WarnsQuantity } from '../core/pipes/warns';
import { UserrankDialogComponent } from './userrank-dialog/userrank-dialog.component';
import { UserProfileDisplayComponent } from './user-profile-display/user-profile-display.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { AddtrackComponent } from './addtrack/addtrack.component';
import { PreferencesListComponent } from './preferences-list/preferences-list.component';
import { PlayerBoxComplexComponent } from './player-box-complex/player-box-complex.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    GoogleAccountPipe,
    WarnsQuantity,
    HeaderComponent,
    ImagesliderComponent,
    HomeinfoComponent,
    MusicdemoComponent,
    PlayerBoxComponent,
    PlayerBoxComplexComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AdminPanelComponent,
    UserPanelComponent,
    UserinfoComponent,
    UserProfileDisplayComponent,
    UserProfileEditComponent,
    AddtrackComponent,
    PreferencesListComponent
  ],
  exports: [
    HeaderComponent,
    ImagesliderComponent,
    HomeinfoComponent,
    MusicdemoComponent,
    PlayerBoxComponent,
    PlayerBoxComplexComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AdminPanelComponent,
    UserPanelComponent,
    UserinfoComponent,
    UserProfileDisplayComponent,
    UserProfileEditComponent,
    AddtrackComponent,
    PreferencesListComponent
  ]
})
export class UiModule { }
