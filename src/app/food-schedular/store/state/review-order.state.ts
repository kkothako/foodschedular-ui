import { EntityState } from '@ngrx/entity';
import { reviewOrderEntity } from '../entity/review-order-state';
import { RestaurentMenuModel } from '../models/restaurent-menu.model';
import { RestorentMasterModel } from '../models/restorent-master.model';
import { ReviewOrderModel } from '../models/review-order.model';

export interface ReviewOrderState extends EntityState<ReviewOrderModel> {
  load: boolean,
  selectedOrder: ReviewOrderModel[],
  deliveryDistance: any,
  restorents: RestorentMasterModel[],
  restaurentMenus: RestaurentMenuModel
}

export const defaultState: ReviewOrderState = {
  load: false,
  entities: {},
  ids: [],
  selectedOrder: [],
  deliveryDistance: null,
  restorents: null,
  restaurentMenus: null
};

export const initialState = reviewOrderEntity.getInitialState(defaultState);
