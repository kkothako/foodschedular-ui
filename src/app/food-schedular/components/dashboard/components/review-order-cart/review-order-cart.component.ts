import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { OrderModel } from 'src/app/food-schedular/store/models/order.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';

import * as userAccountSelectors from './../../../../store/selector/user-account.selector';
import * as selectors from './../../../../store/selector/food-shedular.selectors';

import * as reviewOrderActions from './../../../../store/action/review-order.action';
import * as reviewOrderSelectors from './../../../../store/selector/review-order.selector';
import { RestorentMasterModel } from 'src/app/food-schedular/store/models/restorent-master.model';
import { groupBy, map, mergeMap, reduce, toArray } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

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


  constructor(private store: Store<AppState>) {
    this.bindPrfileName();

    this.getAllIn5MilesZipCodes();
    this.bindAllIn5MilesZipCodes();
    this.bindAllRestaurents();
    this.bindAllDraftOrderWithPriceDetails();
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

        const orderTableData = [];
        console.log('Drat order with price details', order);
        if (order) {
          of(...order).pipe(
            groupBy((p: any) => new Date(p.scheduledDate).toLocaleDateString()),
            mergeMap(group$ =>
              group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
            ),
            map(arr => ({ date: arr[0], orderData: arr.slice(1) })),
            toArray()
          ).subscribe(groupOrder => {
            this.totalPrice = 0;
            groupOrder.forEach(order => {
              let menuAndSlot = '';
              order.orderData.forEach(item => {
                const slotTime = item.scheduledDate.split(' ');
                this.totalPrice += item.restaurentMenu.restaurentMenu.Price;

                menuAndSlot += `<br/><i class="pi pi-circle-on" style="font-size: 0.7rem"></i> ${slotTime[1]}:
                                ${item.restaurentMenu.restaurentMenu.menuName} <br/> <br/>`
                orderTableData.push({ date: order.date, item: menuAndSlot, cost: '' });
              });
            });
            // groupOrder.forEach(order => {
            //   const item = order.orderData.map(item => item.restaurentMenu).map(item => {
            //     return item.restaurentMenu.menuName
            //   }).join(',');
            //   orderTableData.push({ date: order.date, item: menuAndSlot, cost: 10 });
            // });

          });
          this.transactions = new MatTableDataSource<any>(orderTableData);;

        }

      });
  }
  getTotalCost() {
    return this.totalPrice + 5;
  }
  ngAfterViewInit(): void {
    this.bindAllDraftOrderWithPriceDetails();

  }

}
