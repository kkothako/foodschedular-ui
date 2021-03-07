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
export const selectNewlyCreatedUser = createSelector(
  accountState,
  state => state.newUser
);
export const selectUserProfiles = createSelector(
  accountState,
  state => state.userProfiles
);
export const selectValidateActivationStatus = createSelector(
  accountState,
  state => state.validateActivationStatus
);

export const selectLoggedInUser = createSelector(
  accountState,
  state => state.loggedInUser
);

export const selectError = createSelector(
  accountState,
  state => state.error
);
