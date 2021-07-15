import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { OrderMasterModel, OrderMasterRequestModel, OrderModel } from 'src/app/food-schedular/store/models/order.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';

import * as userAccountSelectors from './../../../../store/selector/user-account.selector';
import * as selectors from './../../../../store/selector/food-shedular.selectors';

import * as reviewOrderActions from './../../../../store/action/review-order.action';
import * as reviewOrderSelectors from './../../../../store/selector/review-order.selector';
import { RestorentMasterModel } from 'src/app/food-schedular/store/models/restorent-master.model';
import { catchError, groupBy, map, mergeMap, reduce, toArray } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-review-order-cart',
  templateUrl: './review-order-cart.component.html',
  styleUrls: ['./review-order-cart.component.scss']
})
export class ReviewOrderCartComponent implements OnInit {

  userProfileName$: Observable<string>;
  draftOrders: OrderModel[] = [];
  hasDispactedAction = true;

  restaurents: RestorentMasterModel[] = [];

  displayedColumns: string[] = ['date', 'item', 'cost'];
  transactions: MatTableDataSource<any>;
  totalPrice: number;
  load$: Observable<boolean>;
  hasOrderSubmitted = false;

  @ViewChild('orderConfirm') orderConfirm: TemplateRef<any>;

  constructor(private store: Store<AppState>,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) {
    this.bindPrfileName();

    this.getAllIn5MilesZipCodes();
    this.bindAllIn5MilesZipCodes();
    this.bindAllRestaurents();
    this.bindAllDraftOrderWithPriceDetails();

    this.bindErrors();
    this.bindLoadError();
  }

  ngOnInit(): void {

    this.store.dispatch(reviewOrderActions.getLanAndLat({ customerZipCode: "08628", restorentZipCode: '08534' }))
  }
  bindPrfileName(): void {
    this.userProfileName$ = this.store.pipe(select(userAccountSelectors.selectUserProfileNickNameByUserId))
  }


  getAllIn5MilesZipCodes(): void {
    this.store.pipe(select(userAccountSelectors.selectSelectedUserProfile))
      .subscribe(profile => {
        if (profile) {
          this.store.dispatch(reviewOrderActions.getAllZipCodesByCustomerZipCode({ customerZipCode: profile.address.zipCode }));
        }
      });
  }
  bindAllIn5MilesZipCodes(): void {
    this.store.pipe(select(reviewOrderSelectors.getAll5MilesZipCodes))
      .subscribe(response => {
        if (response.length > 0 && this.hasDispactedAction) {
          this.hasDispactedAction = false;
          const zipCodes = response.map(item => item.zip_code);
          this.store.dispatch(reviewOrderActions.getAllRestaurentsByZipCodes({ zipCodes: zipCodes }));
        }
      });
  }

  bindAllRestaurents(): void {
    this.store.pipe(select(reviewOrderSelectors.selectAllRestaurents))
      .subscribe(restaurents => {
        if (this.restaurents.length === 0 && restaurents) {
          this.restaurents = restaurents;
          var restaurentIdList = this.restaurents.map(restaurent => restaurent.restaurantId);
          this.store.dispatch(reviewOrderActions.getAllRestaurentMenusAndTimings({ restaurentIds: restaurentIdList }))
        }
      });

  }

  bindAllDraftOrderWithPriceDetails(): void {
    this.store.pipe(select(reviewOrderSelectors.selectDraftOrderWithPriceDetails))
      .subscribe(order => {
        this.draftOrders = order;
        const orderTableData = [];
        console.log('Drat order with price details', order);
        if (order && orderTableData.length === 0) {
          of(...order).pipe(
            groupBy((p: any) => new Date(p.scheduledDate).toLocaleDateString()),
            mergeMap(group$ =>
              group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
            ),
            map(arr => ({ date: arr[0], orderData: arr.slice(1) })),
            toArray()
          ).subscribe(groupOrder => {
            this.totalPrice = 0;
            debugger
            groupOrder.forEach(order => {
              let menuAndSlot = '';
              order.orderData.forEach(item => {
                const slotTime = item.scheduledDate.split(' ');
                this.totalPrice += item.restaurentMenu.restaurentMenu.Price;

                menuAndSlot += `<br/><i  class="pi pi-circle-on text-danger" style="font-size: 0.5rem"></i> ${slotTime[1]}:
                                ${item.restaurentMenu.restaurentMenu.menuName} ${order.orderData.length === 1 ? '' : '<br/>'}`

              });
              orderTableData.push({ date: order.date, item: menuAndSlot, cost: '' });
            });

          });
          this.transactions = new MatTableDataSource<any>(orderTableData);;

        }

      });
  }
  getTotalCost() {
    return this.totalPrice;
  }
  ngAfterViewInit(): void {
    this.bindAllDraftOrderWithPriceDetails();

  }

  orderSubmit(): void {
    debugger

    const orderRequest = <OrderMasterRequestModel>{
      orders: [],
      orderMaster: {}
    };

    orderRequest.orderMaster.profileId = this.draftOrders[0].profileId;
    orderRequest.orderMaster.userId = this.draftOrders[0].userId;
    orderRequest.orderMaster.totalAmount = this.totalPrice;
    orderRequest.orderMaster.paidAmmount = 0.00;
    orderRequest.orderMaster.tax = 5.00;
    orderRequest.orderMaster.orderStatus = 'New';

    this.draftOrders.forEach(order => {

      const orderData = <OrderModel>{};
      orderData.profileId = order.profileId;
      orderData.userId = order.userId;
      orderData.proteinId = order.proteinID;
      orderData.cuisineId = order.cuisineID;
      orderData.menuId = order.restaurentMenu.restaurentMenu._id;
      orderData.restaurentId = order.restaurent.restaurantId;
      orderData.scheduleDate = order.scheduledDate;
      orderData.price = order.restaurentMenu.restaurentMenu.Price;
      orderData.orderStatus = 'New';

      orderRequest.orders.push(orderData);

    });

    this.store.dispatch(reviewOrderActions.createOrderMaster({ payload: orderRequest }));
    this.hasOrderSubmitted = true;
  }
  bindErrors(): void {
    this.store.pipe(select(reviewOrderSelectors.selectIfAnyErrors))
      .subscribe(error => {
        if (error) {
          this.openSnackBar(`Opps something went wrong, ${error}`, 'Error', 5000);
        }
      });
  }

  openSnackBar(message: string, action: string, duration = 5000) {
    this._snackBar.dismiss();
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

  bindLoadError(): void {
    this.load$ = this.store.pipe(select(reviewOrderSelectors.selectLoad))
      .pipe(
        catchError((error) => {
          if (error) {
            this.openSnackBar(`Opps something went wrong, ${error}`, 'Error', 5000);
          }
          return EMPTY;
        })
      )

    this.load$.subscribe(load => {
      if (!load && this.hasOrderSubmitted) {
        this.hasOrderSubmitted = false;
        this.openSnackBar(`Order been created successfully.`, 'Success', 5000);
        this.router.navigate(['food-schedular/dashboard/schedule-food/order-confirmation']);
      }
    })
  }

  doesOrderCreatedSuccessfully(): void {

    this.store.pipe(select(reviewOrderSelectors.selectCreatedOrderMaster))
      .subscribe(response => {
        if (response) {
          this.router.navigate(['/schedule-food/order-confirmation']);
        }
      })
  }
  orderConfirmDialog() {
    this.dialog.open(this.orderConfirm);
  }
}
