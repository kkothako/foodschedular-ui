import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserAccountRegistrationModel } from 'src/app/food-schedular/store/models/user-account.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';
import * as selectors from './../../../store/selector/user-account.selector';
import * as loginActions from './../../../store/action/user-account-login';
import * as foodSelectors from './../../../store/selector/food-shedular.selectors';
import { OrderModel } from 'src/app/food-schedular/store/models/order.model';
import * as orderActions from './../../../store/action/order.action';
import { UserProfileModel } from 'src/app/food-schedular/store/models/user-profile.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isSmallScreen: boolean;
  @Output() sideNavToggle = new EventEmitter<void>();
  @Output() changeTheame = new EventEmitter<void>();
  loggedInUser$: Observable<UserAccountRegistrationModel>;
  draftOrders$: Observable<OrderModel[]>;
  userId: string;
  selectedUserProfile: UserProfileModel;

  constructor(private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {

    this.store.pipe(select(selectors.selectSelectedUserProfile))
      .subscribe(profile => {
        this.selectedUserProfile = profile;
      });
    this.bindDraftOrders();
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall])
      .subscribe(state => {
        this.isSmallScreen = state.matches;
      });

    this.loggedInUser$ = this.store.pipe(select(selectors.selectLoggedInUser));

  }
  navigateLoginOrLogOut(): void {
    this.store.dispatch(loginActions.logoutAction());
    this.store.dispatch(orderActions.clearOrderStore());

    this.router.navigate(['food-schedular/useraccount/signin']);
  }
  bindDraftOrders(): void {
    this.draftOrders$ = this.store.pipe(select(foodSelectors.selectDraftOrders));
  }
  navigateReviewOrder(): void {
    this.router.navigate(['food-schedular/dashboard/schedule-food/review-order-cart']);
  }
  back(): void {
    if(this.selectedUserProfile && this.selectedUserProfile.userId){
      this.router.navigate(['food-schedular/dashboard/schedule-food',  this.selectedUserProfile.userId,  this.selectedUserProfile.id]);
    }
  }
}
