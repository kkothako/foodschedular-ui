import { createReducer, Action, on } from '@ngrx/store';
import { userAccountEntity } from '../entity/user-account.entity';
import { initialState, UserAccountState } from '../state/user-account.state';
import * as actions from '../action/user-account.action';
import * as preferenceActions from '../action/user-preferences.action';
import * as loginActions from './../action/user-account-login';

export function userAccountReducer(state: UserAccountState, action: Action) {
  return reducer(state, action);
}
const reducer = createReducer(initialState,
  on(actions.createRegistration, (state) => {
    return { ...state, load: true };
  }),
  on(actions.createRegistrationSuccess, (state, { response }) => {
    return { ...state, load: false, newUser: response, error: null };
  }),
  on(actions.createRegistrationError, (state, { error }) => {
    return { ...state, load: false, error: error };
  }),
  on(actions.validateActivationKey, (state) => {
    return { ...state, load: true };
  }),
  on(actions.validateActivationKeySuccess, (state, { status }) => {
    return { ...state, load: false, validateActivationStatus: status };
  }),
  on(actions.validateActivationKeyError, (state, { error }) => {
    return { ...state, load: false, validateActivationStatus: false, error: error };
  }),
  on(actions.getUserProfiles, (state) => {
    return { ...state, load: true };
  }),
  on(actions.getUserProfilesSuccess, (state, { profiles }) => {
    return { ...state, load: false, userProfiles: profiles };
  }),
  on(actions.getUserProfilesError, (state, { error }) => {
    return { ...state, load: false, error: error, validateActivationStatus: true };
  }),
  on(loginActions.validateLogin, (state) => {
    return { ...state, load: true, error: null, loggedInUser: null };
  }),
  on(loginActions.validateLoginSuccess, (state, { response }) => {
    return { ...state, load: false, loggedInUser: response, error: null };
  }),
  on(loginActions.validateLoginError, (state, { error }) => {
    return { ...state, load: false, error: error, loggedInUser: null };
  }),
  on(loginActions.logoutAction, (state) => {
    return { ...state, load: false, error: null, loggedInUser: null };
  }),
  on(actions.createUserProfile, (state) => {
    return { ...state, load: true, error: null, loggedInUser: null };
  }),
  on(actions.createUserProfileSuccess, (state, { response }) => {
    return { ...state, load: false, userProfiles: response, hasSavedSuccess: true, error: null };
  }),
  on(actions.createUserProfileError, (state, { error }) => {
    return { ...state, load: false, error: error, loggedInUser: null, hasSavedSuccess: false };
  }),
  on(preferenceActions.createPreferences, (state) => {
    return { ...state, load: true, error: null, loggedInUser: null };
  }),
  on(preferenceActions.createPreferencesSuccess, (state, { response }) => {
    return { ...state, load: false, preferencens: response,  hasSavedSuccess: true, error: null };
  }),
  on(preferenceActions.createPreferencesError, (state, { error }) => {
    return { ...state, load: false, error: error, loggedInUser: null, hasSavedSuccess: false };
  }),
  on(actions.getAddress, (state) => {
    return { ...state, load: true, address: null }
  }),
  on(actions.getAddressSuccess, (state, { response }) => {
    return { ...state, load: false, address: response }
  }),
  on(preferenceActions.getPreferences, (state) => {
    return { ...state, load: true, error: null, loggedInUser: null };
  }),
  on(preferenceActions.getPreferencesSuccess, (state, { response }) => {
    return { ...state, load: false, preferencens: response, error: null };
  }),
  on(preferenceActions.getPreferencesError, (state, { error }) => {
    return { ...state, load: false, error: error, loggedInUser: null, hasSavedSuccess: false };
  }),
);
