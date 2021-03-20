import { createReducer, Action, on } from '@ngrx/store';
import { userAccountEntity } from '../entity/user-account.entity';
import { initialState } from '../state/food-schedular.state';
import * as actions from './../action/food-schedular.action';

import { FoodSchedularState } from '../state/food-schedular.state';

export function foodSchedularReducer(state: FoodSchedularState, action: Action) {
  return reducer(state, action);
}
const reducer = createReducer(initialState,
  on(actions.getAllCuisines, (state) => {
    return { ...state, load: true };
  }),
  on(actions.getAllCuisinesSuccess, (state, { response }) => {
    return { ...state, cuisines: response, load: false }
  }),
  on(actions.getAllCuisinesError, (state, { error }) => {
    return { ...state, cuisines: null, load: false, error: error }
  })
);
