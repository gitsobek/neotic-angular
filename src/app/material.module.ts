import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatTabsModule, MatButton, MatButtonToggle, MatButtonToggleModule, MatDialogModule, MatOptionModule, MatSelectModule, MatButtonModule, MatMenuModule, MatRadioButton, MatRadioModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';


@NgModule({
  imports: [
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatOptionModule,
    MatMenuModule,
    MatRadioModule,
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
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule
  ]
})


export class MaterialModule{}
