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
    }));
