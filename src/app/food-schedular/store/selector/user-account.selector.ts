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

export const selectHasProfileCreated =  createSelector(
  accountState,
  state => state.hasSavedSuccess
);

export const selectAddress =  createSelector(
  accountState,
  state => state.address
);

export const selectUserProfileNickNameByUserId = createSelector(
  accountState,
  selectLoggedInUser,
  (state, logedInUser) => {
    const profile  =state.userProfiles.find(dr=>dr.userId === logedInUser.id);
    return profile?.nickName;
  }
);

export const selectGetPreferencesByUserId = createSelector(
  accountState,
  state => state.preferencens
);
