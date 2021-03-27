import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CalendarApi } from '@fullcalendar/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FoodSchedularEffect } from './effects/food.schedular.effect';
import { UserAccountEffect } from './effects/user-account.effect';
import { foodSchedularReducer } from './reducer/food-schedular.reducer';
import { userAccountReducer } from './reducer/user-account.reducer';
import { ConstantService } from './service/constant.service';
import { FoodSchedularService } from './service/food-schedular.service';
import { UserAccountService } from './service/user-account.service';
import { UserPreferencesService } from './service/user-preferences.service';

const reducerMap = {
  userAccountState: userAccountReducer,
  foodSchedularState: foodSchedularReducer
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('appState', reducerMap),
    EffectsModule.forFeature([
      UserAccountEffect,
      FoodSchedularEffect
    ])
  ],
  providers: [
    UserAccountService,
    FoodSchedularService,
    ConstantService,
    UserPreferencesService,
    CalendarApi
  ]
})
export class StoreFeatureBaseModule {

}
