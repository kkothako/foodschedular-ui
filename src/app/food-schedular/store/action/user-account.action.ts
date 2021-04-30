import { createAction, props } from '@ngrx/store';
import { UserProfileModel } from '../models/user-profile.model';

import * as model from '../models/user-account.model';

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
  props<{ activationKey: string, userId: string }>()
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

export const getUserProfileByProfileId = createAction(
  '[app-profile] Get user profiles by userId & profileId',
  props<{ userId: string, profileId: string }>()
);
export const getUserProfileByProfileIdSuccess = createAction(
  '[app-profile] Get user profiles by userid & profileId success',
  props<{ profiles: UserProfileModel[] }>()
);
export const getUserProfileByProfileIdError = createAction(
  '[app-profile] Get user profiles by userid & profileId error',
  props<{ error: any }>()
);


export const createUserProfile = createAction(
  '[app-profile] Create user profile',
  props<{ payload: UserProfileModel }>()
);

export const createUserProfileSuccess = createAction(
  '[app-profile] Create user profile success',
  props<{ response: UserProfileModel }>()
);

export const createUserProfileError = createAction(
  '[app-profile] Create user profile error',
  props<{ error: any }>()
);

export const getAddress = createAction(
  '[app-profile] Get address by zipcode',
  props<{ zipCode: string }>()
);

export const getAddressSuccess = createAction(
  '[app-profile] Get address by zipcode success',
  props<{ response: model.AddressModel }>()
);

export const setUserIdAndProfileId = createAction(
  '[app-schedule-food] Set UserId and ProfileId',
  props<{ payload:UserProfileModel }>()
);

export const deleteProfileById = createAction(
  '[app-manage-profile] Delete Profile',
  props<{ profileId: string }>()
);
export const deleteProfileByIdSucccess = createAction(
  '[app-manage-profile] Delete Profile Success',
  props<{ response: UserProfileModel }>()
);
export const deleteProfileByIdError = createAction(
  '[app-manage-profile] Delete Profile Error',
  props<{ error: any }>()
);

export const forGotPassword = createAction(
  '[app-forgot-passowrd] Forgot password',
  props<{emailId:string}>()
);
export const forGotPasswordSuccess = createAction(
  '[app-forgot-passowrd] Forgot password Success',
  props<{response:any}>()
);
