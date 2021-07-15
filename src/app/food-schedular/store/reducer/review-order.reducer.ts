
import { createReducer, on } from '@ngrx/store';

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
    on(reviewOrderActions.errorAction, (state, { error }) => {
      return { ...state, load: false, restorents: null, errors: error }
    }),
    on(reviewOrderActions.getAllRestaurentMenusAndTimings, (state) => {
      return { ...state, load: true, restaurentMenusPlusTimings: null }
    }),
    on(reviewOrderActions.getAllRestaurentMenusAndTimingsSuccess, (state, { payload }) => {
      return { ...state, load: false, restaurentMenusPlusTimings: payload }
    }),
    on(reviewOrderActions.getAllZipCodesByCustomerZipCode, (state) => {
      return { ...state, load: true, in5MilesAllZipCodes: [] }
    }),
    on(reviewOrderActions.getAllZipCodesByCustomerZipCodeSuccess, (state, { payload }) => {
      return { ...state, load: false, in5MilesAllZipCodes: payload }
    }),
    on(reviewOrderActions.createOrderHistory, (state) => {
      return { ...state, load: true, orderHistoryStatus: false }
    }),
    on(reviewOrderActions.createOrderHistorySuccess, (state, { payload }) => {
      return { ...state, load: false, orderHistoryStatus: payload != null ? true : false }
    }),
    on(reviewOrderActions.createOrderMaster, (state) => {
      return { ...state, load: true, orderMaster: null }
    }),
    on(reviewOrderActions.createOrderMasterSuccess, (state, { payload }) => {
      return { ...state, load: false, orderMaster: payload }
    }),
    on(reviewOrderActions.getOrderHistoryBy, (state) => {
      return { ...state, load: true }
    }),
    on(reviewOrderActions.getOrderHistoryBySuccess, (state, { payload }) => {
      return { ...state, load: false, orderHistory: payload }
    })
  );
