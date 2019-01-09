import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-songdeletedialog',
  templateUrl: './songdeletedialog.component.html',
  styleUrls: ['./songdeletedialog.component.scss']
})
export class SongdeletedialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SongdeletedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(true);
  }

}
