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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    HeaderComponent,
    ImagesliderComponent,
    HomeinfoComponent,
    MusicdemoComponent,
    FooterComponent,
    PlayerBoxComponent
    ],
  exports: [
    HeaderComponent,
    ImagesliderComponent,
    HomeinfoComponent,
    MusicdemoComponent,
    FooterComponent,
    PlayerBoxComponent
  ]
})
export class UiModule { }
