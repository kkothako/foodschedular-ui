import { createReducer, Action, on } from '@ngrx/store';
import { userAccountEntity } from '../entity/user-account.entity';
import { initialState, UserAccountState } from '../state/user-account.state';
import * as actions from './../action/user-accout.action';

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
  on(actions.createRegistrationError, (state, {error})=>{
    return { ...state, load: false, error: error };
  })
);
