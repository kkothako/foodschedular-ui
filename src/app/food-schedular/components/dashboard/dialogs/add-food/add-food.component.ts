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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConstantService } from 'src/app/food-schedular/store/service/constant.service';
import * as userAccountSelectors from './../../../../store/selector/user-account.selector';
import { PreferencesModel } from 'src/app/food-schedular/store/models/preferences.model';


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
  cusines: CuisineModel[];
  protiens: ProtienModel[];
  preference: PreferencesModel;

  constructor(private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data:
      { userId: string, selectedProfileName: string, profileId: string, scheduleDate: string },
    private _snackBar: MatSnackBar,
    private constantService: ConstantService,
    public dialogRef: MatDialogRef<AddFoodComponent>) {
    this.getLogedInUserPreferences();
    //this.bindDropdowns();
    this.load$ = this.store.pipe(select(selectors.selectLoad));

    this.store.pipe(select(selectors.selectOrderStatus))
      .subscribe(response => {
        if (this.hasOrderClick && response && response.status) {
          this.closeDialog();
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

    this.store.pipe(select(selectors.selectAllCuisines))
      .subscribe(response => {
        if (response) {
          this.cusines =[];
          this.preference.cuisines.forEach(item => {
            const cuisine = response.find(x => x._id === item._id);
            if (cuisine) {
              this.cusines.push(cuisine);
            }
          });
        }

      });
    this.store.pipe(select(selectors.slectAllProtiens))
      .subscribe(response => {
        if (response) {
          this.protiens =[];
          this.preference.proteins.forEach(item => {
            const protien = response.find(x => x._id === item._id);
            if (protien) {
              this.protiens.push(protien);
            }
          });
        }

      });
    // this.protiens$ = this.store.pipe(select(selectors.slectAllProtiens))
    //   .pipe(catchError((error) => {
    //     console.log(error);
    //     return EMPTY;
    //   }));

    // this.viewModel$ = combineLatest([this.cusines$, this.protiens$])
    //   .pipe(map(([cuisines, protiens]) => ({ cuisines, protiens })));

  }


  createDraftOrder(cusine: CuisineModel, protien: ProtienModel, date: any): void {

    const selectedDate = this.data.scheduleDate ? this.data.scheduleDate : this.constantService.getFormatedDate(date);

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

  openSnackBar(message: string, action: string, duration = 5000) {
    this._snackBar.dismiss();
    this._snackBar.open(message, action, {
      duration: duration,
    });

  }
  closeDialog() {
    this.dialogRef.close();
  }
  getLogedInUserPreferences(): void {
    this.store.pipe(select(userAccountSelectors.selectLogedInUserPreferences))
      .subscribe(response => {
        if (response) {
          this.preference = response;
          this.bindDropdowns();
        }
      });
  }
}
