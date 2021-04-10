import { EntityState } from '@ngrx/entity';
import { userAccountEntity } from '../entity/user-account.entity';
import { OrderModel } from '../models/order.model';
import { UserAccountModel } from '../models/user-account.model';
import { UserProfileModel } from '../models/user-profile.model';
import * as model from './../models/user-account.model';
import * as preferencesModel from './../models/preferences.model';

export interface UserAccountState extends EntityState<UserAccountModel> {
  load: boolean,
  newUser: model.UserAccountRegistrationModel,
  error: any,
  validateActivationStatus: boolean,
  userProfiles: UserProfileModel[],
  loggedInUser: model.UserAccountRegistrationModel,
  hasSavedSuccess: boolean,
  address: model.AddressModel,
  preferencens: preferencesModel.PreferencesModel[],
  selectedProfile: UserProfileModel
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
  hasSavedSuccess: false,
  address: null,
  preferencens: null,
  selectedProfile: null
};

export const initialState = userAccountEntity.getInitialState(defaultState);

