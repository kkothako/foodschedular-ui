import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderModel } from 'src/app/food-schedular/store/models/order.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';

import * as userAccountSelectors from './../../../../store/selector/user-account.selector';
import * as selectors from './../../../../store/selector/food-shedular.selectors';

import * as reviewOrderActions from './../../../../store/action/review-order.action';



@Component({
  selector: 'app-review-order-cart',
  templateUrl: './review-order-cart.component.html',
  styleUrls: ['./review-order-cart.component.scss']
})
export class ReviewOrderCartComponent implements OnInit {

  userProfileName$: Observable<string>;
  draftOrders: OrderModel[] = [];

  displayedColumns: string[] = ['date', 'item', 'cost'];
  transactions: any[] = [
    { date: '09/03/2021', time: '9:00:00', item: 'Beach ball', cost: 4 },
    { date: '09/03/2021', time: '9:00:00', item: 'Towel', cost: 5 },
    { date: '09/03/2021', time: '9:00:00', item: 'Frisbee', cost: 2 },
    { date: '09/03/2021', time: '9:00:00', item: 'Sunscreen', cost: 4 },
    { date: '09/03/2021', time: '9:00:00', item: 'Cooler', cost: 25 },
    { date: '09/03/2021', time: '9:00:00', item: 'Swim suit', cost: 15 },
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  constructor(private store: Store<AppState>) {
    this.bindPrfileName();
    this.bindDraftOrderReview();
  }

  ngOnInit(): void {
    this.store.dispatch(reviewOrderActions.getLanAndLat({ customerZipCode: "08628", restorentZipCode: '08534' }))
  }
  bindPrfileName(): void {
    this.userProfileName$ = this.store.pipe(select(userAccountSelectors.selectUserProfileNickNameByUserId))
  }

  bindDraftOrderReview(): void {
    this.store.pipe(select(selectors.selectDraftOrders))
      .subscribe(orders => {
        this.draftOrders = orders;
      });
  }
}
