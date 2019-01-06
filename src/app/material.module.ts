import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatTabsModule, MatButton, MatButtonToggle, MatButtonToggleModule, MatDialogModule, MatOptionModule, MatSelectModule, MatButtonModule, MatMenuModule, MatRadioButton, MatRadioModule, MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  imports: [
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatOptionModule,
    MatMenuModule,
    MatRadioModule,
    MatSliderModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  exports: [
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatOptionModule,
    MatRadioModule,
    MatSliderModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule
  ]
})


export class MaterialModule{}
