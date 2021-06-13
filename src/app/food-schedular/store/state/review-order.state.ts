import { EntityState } from '@ngrx/entity';
import { reviewOrderEntity } from '../entity/review-order-state';
import { ReviewOrderModel } from '../models/review-order.model';

export interface ReviewOrderState extends EntityState<ReviewOrderModel>{
  load: boolean,
  selectedOrder: ReviewOrderModel[],
  deliveryDistance: any
}

export const defaultState:ReviewOrderState={
  load: false,
  entities: {},
  ids: [],
  selectedOrder: [],
  deliveryDistance: null
};

export const initialState = reviewOrderEntity.getInitialState(defaultState);
