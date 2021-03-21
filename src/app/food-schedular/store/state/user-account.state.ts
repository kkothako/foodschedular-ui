import { EntityState } from '@ngrx/entity';
import { userAccountEntity } from '../entity/user-account.entity';
import { UserAccountModel } from '../models/user-account.model';
import { UserProfileModel } from '../models/user-profile.model';
import * as model from './../models/user-account.model';

export interface UserAccountState extends EntityState<UserAccountModel> {
  load: boolean,
  newUser: model.UserAccountRegistrationModel,
  error: any,
  validateActivationStatus: boolean,
  userProfiles: UserProfileModel[],
  loggedInUser: model.UserAccountRegistrationModel,
  hasSavedSuccess: boolean
}

export const defaultState: UserAccountState = {
  entities: {},
  ids: null,
  load: false,
  newUser: null,
  error: null,
  validateActivationStatus: false,
  userProfiles: null,
  loggedInUser: null,
  hasSavedSuccess: false
};

export const initialState = userAccountEntity.getInitialState(defaultState);

