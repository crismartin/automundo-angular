import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  templateUrl: 'cancel-yes-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class CancelYesDialogComponent {

  title: string;
  text: string;
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog) {
    this.title = data.title || 'Confirmación';
    this.text = data.text || '¿Está seguro/a?';
    this.data = data;
  }
}
