import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const appState = createFeatureSelector<AppState>('appState');

export const foodSchedularState = createSelector(
  appState,
  state => state.foodSchedularState
);

export const selectAllCuisines = createSelector(
  foodSchedularState,
  state => state.cuisines
);

export const selectLoad = createSelector(
  foodSchedularState,
  state => state.load
);

export const slectAllProtiens = createSelector(
  foodSchedularState,
  state => state.protiens
);

export const selectAllAllergys = createSelector(
  foodSchedularState,
  state => state.allergys
);

export const selectOrderStatus = createSelector(
  foodSchedularState,
  state => state.orderStatus
);
