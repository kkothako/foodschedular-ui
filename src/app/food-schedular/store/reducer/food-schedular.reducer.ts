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
  on(actions.getAllProtiens, (state)=>{
    return {...state, load: true}
  }),
  on(actions.getAllProtiensSuccess, (state, { response }) => {
    return { ...state, protiens: response, load: false }
  }),
  on(actions.getAllAllergys, (state) => {
    return { ...state, load: true };
  }),
  on(actions.getAllAllergysSuccess, (state, { response }) => {
    return { ...state, allergys: response, load: false }
  }),
  on(actions.getErrorAction, (state, { error }) => {
    return { ...state, cuisines: null, load: false, error: error }
  })
);
