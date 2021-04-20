import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/food-schedular/store/state/app.state';
import * as orderActions from './../../../../store/action/order.action';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  @ViewChild('confirmDelete') confirmDelete: TemplateRef<any>;
  selectedDraftId: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data:
    { userId: string, profileId: string,
      selectedProfileName: string, scheduleDate: string, title: string,
    orderId:string },
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ViewOrderComponent>,
    public dialog: MatDialog,
    private store: Store<AppState>) { }

  ngOnInit(): void {
  }
  confirmDeleteDialog(draftId: string): void {
    this.selectedDraftId = draftId;
    this.dialog.open(this.confirmDelete);
  }

  deleteDraftOrder(): void {
    this.store.dispatch(orderActions.deleteDraftOrder({ orderId: this.selectedDraftId }));
    this.dialog.closeAll();
  }
}
