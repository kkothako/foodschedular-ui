import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderMasterModel } from 'src/app/food-schedular/store/models/order.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';

import * as reviewOrderSelectors from './../../../../store/selector/review-order.selector';


@Component({
  selector: 'app-order-cofirmation',
  templateUrl: './order-cofirmation.component.html',
  styleUrls: ['./order-cofirmation.component.scss']
})
export class OrderCofirmationComponent implements OnInit {

  orderMaster$: Observable<OrderMasterModel>
  constructor(private store: Store<AppState>,
    private _snackBar: MatSnackBar) {
      this.bindOrderMasterDetails();
    }

  ngOnInit(): void {

  }
  bindOrderMasterDetails(): void {
    this.orderMaster$ = this.store.pipe(select(reviewOrderSelectors.selectCreatedOrderMaster))
      .pipe(catchError((error) => {
        this.openSnackBar(`Opps something went wrong, ${error}`, 'Error', 5000);
        return EMPTY;
      }))

  }

  openSnackBar(message: string, action: string, duration = 5000) {
    this._snackBar.dismiss();
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

}
