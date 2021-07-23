import { createReducer, Action, on } from '@ngrx/store';
import { userAccountEntity } from '../entity/user-account.entity';
import { initialState } from '../state/food-schedular.state';
import * as actions from './../action/food-schedular.action';

import { FoodSchedularState } from '../state/food-schedular.state';
import * as orderAction from '../action/order.action';
import * as reviewOrderActions from './../action/review-order.action';

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
  on(actions.getAllProtiens, (state) => {
    return { ...state, load: true }
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
  }),
  on(orderAction.createDraftOrder, (state) => {
    return { ...state, load: true }
  }),
  on(orderAction.createDraftOrderSuccess, (state, { result }) => {
    return { ...state, load: false, hasSaved: true, orderStatus: result }
  }),
  on(orderAction.orderError, (state) => {
    return { ...state, load: false, hasSaved: false, }
  }),
  on(orderAction.getDraftOrders, (state) => {
    return { ...state, load: true, draftOrders: null }
  }),
  on(orderAction.getDraftOrdersSuccess, (state, { result }) => {
    return { ...state, load: false, hasSaved: true, draftOrders: result }
  }),
  on(orderAction.clearOrderStore, (state) => {
    return { ...state, load: false, draftOrders: null }
  }),
  on(orderAction.deleteDraftOrder, (state) => {
    return { ...state, load: true }
  }),
  on(orderAction.deleteDraftOrderSuccess, (state, { response }) => {
    return { ...state, load: true, draftOrders: state.draftOrders.filter(order => order.id !== response?.id) }
  }),
  on(reviewOrderActions.deleteDraftOrdersBy, (state) => {
    return { ...state, load: true, hasDeleted: false }
  }),
  on(reviewOrderActions.deleteDraftOrdersBySuccess, (state, {payload}) => {
    return { ...state, load: false, draftOrders: clearDraftOrder(state) }
  })
);


export function clearDraftOrder(state: FoodSchedularState){
  return state.draftOrders = null
}
