import { EntityState } from '@ngrx/entity';
import { reviewOrderEntity } from '../entity/review-order-state';
import { OrderMasterModel } from '../models/order.model';
import { RestaurentMenuModel } from '../models/restaurent-menu.model';
import { RestorentMasterModel } from '../models/restorent-master.model';
import { ReviewOrderModel } from '../models/review-order.model';
import { ZipCodeModel } from '../models/zipcode.model';

export interface ReviewOrderState extends EntityState<ReviewOrderModel> {
  load: boolean,
  selectedOrder: ReviewOrderModel[],
  deliveryDistance: any,
  restorents: RestorentMasterModel[],
  restaurentMenusPlusTimings: RestaurentMenuModel[],
  in5MilesAllZipCodes: ZipCodeModel[],
  orderMaster: OrderMasterModel,
  orderHistoryStatus: boolean,
  errors: any;
}

export const defaultState: ReviewOrderState = {
  load: false,
  entities: {},
  ids: [],
  selectedOrder: [],
  deliveryDistance: null,
  restorents: null,
  restaurentMenusPlusTimings: null,
  in5MilesAllZipCodes: [],
  orderMaster: null,
  orderHistoryStatus: false,
  errors: null
};

export const initialState = reviewOrderEntity.getInitialState(defaultState);
