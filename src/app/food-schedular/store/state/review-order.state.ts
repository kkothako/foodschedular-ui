import { EntityState } from '@ngrx/entity';
import { reviewOrderEntity } from '../entity/review-order-state';
import { RestaurentMenuModel } from '../models/restaurent-menu.model';
import { RestorentMasterModel } from '../models/restorent-master.model';
import { ReviewOrderModel } from '../models/review-order.model';
import { ZipCodeModel } from '../models/zipcode.model';

export interface ReviewOrderState extends EntityState<ReviewOrderModel> {
  load: boolean,
  selectedOrder: ReviewOrderModel[],
  deliveryDistance: any,
  restorents: RestorentMasterModel[],
  restaurentMenus: RestaurentMenuModel,
  in5MilesAllZipCodes: ZipCodeModel[]
}

export const defaultState: ReviewOrderState = {
  load: false,
  entities: {},
  ids: [],
  selectedOrder: [],
  deliveryDistance: null,
  restorents: null,
  restaurentMenus: null,
  in5MilesAllZipCodes: []
};

export const initialState = reviewOrderEntity.getInitialState(defaultState);
