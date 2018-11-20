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


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    HeaderComponent,
    ImagesliderComponent,
    HomeinfoComponent,
    MusicdemoComponent,
    PlayerBoxComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  exports: [
    HeaderComponent,
    ImagesliderComponent,
    HomeinfoComponent,
    MusicdemoComponent,
    PlayerBoxComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class UiModule { }
