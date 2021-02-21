import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserAccountEffect } from './effects/user-account.effect';
import { userAccountReducer } from './reducer/user-account.reducer';
import { UserAccountService } from './service/user-account.service';

const reducerMap = {
  userAccountState: userAccountReducer
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('appState', reducerMap),
    EffectsModule.forFeature([
      UserAccountEffect
    ])
  ],
  providers: [
    UserAccountService
  ]
})
export class StoreFeatureBaseModule {

}
