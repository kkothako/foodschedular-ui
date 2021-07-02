import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { load } from '../selector/user-account.selector';

import * as reviewOrderActions from './../action/review-order.action';
import * as reviewOrderEntity from './../entity/review-order-state';
import * as reviewOrderState from './../state/review-order.state';

export const reviewOrderReducer =
  createReducer(reviewOrderState.initialState,
    on(reviewOrderActions.getLanAndLat, (state) => {
      return { ...state, load: true }
    }),
    on(reviewOrderActions.getLangAndLatSuccess, (state, { result }) => {
      return { ...state, load: false, deliveryDistance: result }
    }),
    on(reviewOrderActions.getLangAndLatError, (state, { error }) => {
      return {
        ...state, load: false, error: error
      }
    }),
    on(reviewOrderActions.getAllRestaurentsByZipCodes, (state) => {
      return { ...state, load: true, restorents: null }
    }),
    on(reviewOrderActions.getAllRestaurentsByZipCodesSuccess, (state, { payload }) => {
      return { ...state, load: false, restorents: payload }
    }),
    on(reviewOrderActions.errorAction, (state) => {
      return { ...state, load: false, restorents: null }
    }),
    on(reviewOrderActions.getAllRestaurentMenusAndTimings, (state) => {
      return { ...state, load: true, restaurentMenus: null }
    }),
    on(reviewOrderActions.getAllRestaurentMenusAndTimingsSuccess, (state, { payload }) => {
      return { ...state, load: false, restaurentMenus: payload }
    }),
    on(reviewOrderActions.getAllZipCodesByCustomerZipCode, (state) => {
      return { ...state, load: true, in5MilesAllZipCodes: [] }
    }),
    on(reviewOrderActions.getAllZipCodesByCustomerZipCodeSuccess, (state, {payload}) => {
      return { ...state, load: false, in5MilesAllZipCodes:payload }
    })
  );
