import { createAction, props } from '@ngrx/store';
import { UserProfileModel } from '../models/user-profile.model';

import * as model from './../models/user-account.model';

export const createRegistration = createAction(
  '[app-registration] Create registration',
  props<{ payload: model.UserAccountRegistrationModel }>()
);
export const createRegistrationSuccess = createAction(
  '[app-registration] Create registration success',
  props<{ response: model.UserAccountRegistrationModel }>()
);
export const createRegistrationError = createAction(
  '[app-registration] Create registration error',
  props<{ error: any }>()
);

export const validateActivationKey = createAction(
  '[app-confirm-email] Validate account activation key',
  props<{ activationKey: string, userId:string }>()
);
export const validateActivationKeySuccess = createAction(
  '[app-confirm-email] Validate account activation key success',
  props<{ status: boolean }>()
);
export const validateActivationKeyError = createAction(
  '[app-confirm-email] Validate account activation key error',
  props<{ error: any }>()
);

export const getUserProfiles = createAction(
  '[app-profile] Get user profiles by userid',
  props<{ userId: string }>()
);
export const getUserProfilesSuccess = createAction(
  '[app-profile] Get user profiles by userid success',
  props<{ profiles: UserProfileModel[] }>()
);
export const getUserProfilesError = createAction(
  '[app-profile] Get user profiles by userid error',
  props<{ error: any }>()
);

