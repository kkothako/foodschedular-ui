import { createAction, props } from '@ngrx/store';
import { OrderModel } from '../models/order.model';

export const orderError = createAction(
  '[app-schedule-food] Create a draft order error',
  props<{ error: any }>()
);
export const createDraftOrder = createAction(
  '[app-schedule-food] Create a draft order',
  props<{ payload: OrderModel }>()
);
export const createDraftOrderSuccess = createAction(
  '[app-schedule-food] Create a draft order success',
  props<{ result:boolean }>()
);
