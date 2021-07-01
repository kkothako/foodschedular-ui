import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CalendarApi } from '@fullcalendar/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AutheriseGaurd } from '../components/dashboard/gaurds/authorise-gaurd';
import { DistanceEffect } from './effects/review-order.effect';
import { FoodSchedularEffect } from './effects/food.schedular.effect';
import { UserAccountEffect } from './effects/user-account.effect';
import { foodSchedularReducer } from './reducer/food-schedular.reducer';
import { userAccountReducer } from './reducer/user-account.reducer';
import { ConstantService } from './service/constant.service';
import { ReviewOrderService } from './service/review-order.service';
import { FoodSchedularService } from './service/food-schedular.service';
import { UserAccountService } from './service/user-account.service';
import { UserPreferencesService } from './service/user-preferences.service';
import { reviewOrderReducer } from './reducer/review-order.reducer';

const reducerMap = {
  userAccountState: userAccountReducer,
  foodSchedularState: foodSchedularReducer,
  reviewOrderState: reviewOrderReducer
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('appState', reducerMap),
    EffectsModule.forFeature([
      UserAccountEffect,
      FoodSchedularEffect,
      DistanceEffect
    ])
  ],
  providers: [
    UserAccountService,
    FoodSchedularService,
    ConstantService,
    UserPreferencesService,
    CalendarApi,
    AutheriseGaurd,
    ReviewOrderService
  ]
})
export class StoreFeatureBaseModule {

}
