import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const appState = createFeatureSelector<AppState>('appState');
export const accountState = createSelector(
  appState,
  state => state.userAccountState
);

export const load = createSelector(
  accountState,
  state => state.load
);

export const error = createSelector(
  accountState,
  state => state.error
);
export const selectNewlyCreatedEmail = createSelector(
  accountState,
  state => state.newUser?.email
);
