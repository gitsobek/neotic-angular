import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesliderComponent } from './imageslider/imageslider.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeinfoComponent } from './homeinfo/homeinfo.component';
import { MusicdemoComponent } from './musicdemo/musicdemo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    ImagesliderComponent,
    HomeinfoComponent,
    MusicdemoComponent,
    FooterComponent],
  exports: [
    HeaderComponent,
    ImagesliderComponent,
    HomeinfoComponent,
    MusicdemoComponent,
    FooterComponent]
})
export class UiModule { }
