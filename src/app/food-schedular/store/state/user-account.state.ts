import { EntityState } from '@ngrx/entity';
import { userAccountEntity } from '../entity/user-account.entity';
import { UserAccountModel } from '../models/user-account.model';
import * as model from './../models/user-account.model';

export interface UserAccountState extends EntityState<UserAccountModel> {
  load: boolean,
  newUser: model.UserAccountRegistrationModel,
  error: any
}


export const defaultState: UserAccountState = {
  entities: {},
  ids: null,
  load: false,
  newUser: null,
  error: null
};

export const initialState = userAccountEntity.getInitialState(defaultState);

