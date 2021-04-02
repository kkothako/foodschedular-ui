import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data:
  { userId: string, profileId: string,selectedProfileName: string, scheduleDate: string, title: string },
  private _snackBar: MatSnackBar,
  public dialogRef: MatDialogRef<ViewOrderComponent>) { }

  ngOnInit(): void {
  }

}
