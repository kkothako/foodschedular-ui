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
  props<{ result:any }>()
);

export const getDraftOrders = createAction(
  '[app-schedule-food] Get a draft order by UserId and ProfileId',
  props<{ userId: string, profileId:string }>()
);
export const getDraftOrdersSuccess = createAction(
  '[app-schedule-food] Get a draft order by UserId and ProfileId success',
  props<{ result:OrderModel[] }>()
);

export const clearOrderStore = createAction(
  '[app-add-food] Clear order store',
);

