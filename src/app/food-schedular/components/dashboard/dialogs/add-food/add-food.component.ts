import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { pid } from 'process';
import { combineLatest, EMPTY, merge, Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CuisineModel, ProtienModel } from 'src/app/food-schedular/store/models/cuisine.model';
import { OrderModel } from 'src/app/food-schedular/store/models/order.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';

import * as actions from './../../../../store/action/food-schedular.action';
import * as selectors from './../../../../store/selector/food-shedular.selectors';
import * as orderActions from './../../../../store/action/order.action';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {

  selectedCuisine: CuisineModel;
  selectedProtien: ProtienModel;

  selectedDate: Date;
  selectedTime: Date;
  myDatePicker: any;
  cusines$: Observable<CuisineModel[]>;
  protiens$: Observable<ProtienModel[]>;
  viewModel$: Observable<any>;
  @ViewChild('#picker') timePicker;
  defaultTime = [new Date().getHours(), 0, 0];;
  userId: string;
  load$: Observable<boolean>;
  hasOrderClick = false;

  constructor(private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string, profileId: string },
    private _snackBar: MatSnackBar) {
    this.bindDropdowns();
    this.load$ = this.store.pipe(select(selectors.selectLoad));

    this.store.pipe(select(selectors.selectOrderStatus))
      .subscribe(response => {
        if (this.hasOrderClick && response && response.status) {
          this.openSnackBar('Order draft saved successfully', 'Hurrey');
          this.hasOrderClick = false;

          this.store.dispatch(orderActions.getDraftOrders({ userId: this.data.userId, profileId: this.data.profileId }));

        } else if (this.hasOrderClick && !response.status) {
          this.openSnackBar(response.message, 'Warning');
          this.hasOrderClick = false;
        }
      });

  }

  ngOnInit(): void {
    this.store.dispatch(actions.getAllCuisines());
    this.store.dispatch(actions.getAllProtiens());
  }
  bindDropdowns(): void {

    this.cusines$ = this.store.pipe(select(selectors.selectAllCuisines))
      .pipe(catchError((error) => {
        console.log(error);
        return EMPTY;
      }));
    this.protiens$ = this.store.pipe(select(selectors.slectAllProtiens))
      .pipe(catchError((error) => {
        console.log(error);
        return EMPTY;
      }));

    this.viewModel$ = combineLatest([this.cusines$, this.protiens$])
      .pipe(map(([cuisines, protiens]) => ({ cuisines, protiens })));

  }


  createDraftOrder(cusine: CuisineModel, protien: ProtienModel, date: any): void {

    const selectedDate = this.getFormatedDate(date);

    const order = <OrderModel>{
      scheduledDate: selectedDate,
      cuisineID: cusine.cuisineID,
      cuisineName: cusine.cuisineName,
      proteinID: protien._id,
      proteinName: protien.proteinName,
      userId: this.data.userId,
      profileId: this.data.profileId
    }
    this.store.dispatch(orderActions.createDraftOrder({ payload: order }));
    this.hasOrderClick = true;
  }
  getFormatedDate(date: any): string {
    return + date.getFullYear() + '-' + ("00" + (date.getMonth() + 1)).slice(-2)
      + "-" + ("00" + date.getDate()).slice(-2) + " "
      + ("00" + date.getHours()).slice(-2) + ":"
      + ("00" + date.getMinutes()).slice(-2)
      + ":" + ("00" + date.getSeconds()).slice(-2)
  }
  openSnackBar(message: string, action: string, duration = 5000) {
    this._snackBar.dismiss();
    this._snackBar.open(message, action, {
      duration: duration,
    });

  }
}
