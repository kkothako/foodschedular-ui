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

export const selectHasProfileCreated = createSelector(
  accountState,
  state => state.preferencens
);

export const selectAddress = createSelector(
  accountState,
  state => state.address
);

export const selectUserProfileNickNameByUserId = createSelector(
  accountState,
  selectLoggedInUser,
  (state, logedInUser) => {
    if (logedInUser) {
      const profile = state.userProfiles.find(dr => dr.userId === logedInUser.id);
      return profile?.nickName;
    }
    return null;
  }
);

export const selectGetPreferencesByUserId = createSelector(
  accountState,
  state => state.preferencens
);

export const selectSelectedUserProfile = createSelector(
  accountState,
  state => state.selectedProfile
);

export const selectSaveOrUpdate = createSelector(
  accountState,
  state => state.saveOrdUpdate
);

export const selectLogedInUserPreferences = createSelector(
  accountState,
  selectLoggedInUser,
  (state, logedInUserState) => {
    return state.preferencens.filter(item => item.userId === logedInUserState.id)[0];
  }

);

export const selectLoggedInUserPreferences = createSelector(
  appState,
  accountState,
  selectLoggedInUser,
  (state, accountState, loggedInUser) => {
    const cusines = [];
    const protiens = [];
    const userPreferences = accountState.preferencens.filter(item => item.userId === state.userAccountState?.selectedProfile?.userId)[0];
    if (userPreferences && state.foodSchedularState.cuisines &&
      state.foodSchedularState.protiens) {
      userPreferences.cuisines.forEach(item => {
        const cuisine = state.foodSchedularState.cuisines.find(x => x._id === item._id);
        if (cuisine) {
          cusines.push(cuisine);
        }
      });

      userPreferences.proteins.forEach(item => {
        const protien = state.foodSchedularState.protiens.find(x => x._id === item._id);
        if (protien) {
          protiens.push(protien);
        }
      });

    }
    return { cusines: cusines, protiens: protiens }
  }
);
