import { EntityState } from '@ngrx/entity';
import { foodSchedularEntity } from '../entity/food-schedular.entity';
import { CuisineModel, ProtienModel, AllergyModel } from '../models/cuisine.model';
import { FoodSchedularModel } from '../models/food-schedular.model';
import { OrderModel } from '../models/order.model';

export interface FoodSchedularState extends EntityState<FoodSchedularModel> {
  load: boolean,
  error: any,
  protiens: ProtienModel[],
  cuisines: CuisineModel[],
  allergys: AllergyModel[]
  draftOrders: OrderModel[],
  hasSaved: boolean;
  orderStatus: any;
}

export const defaultState: FoodSchedularState = {
  entities: {},
  ids: null,
  load: false,
  error: null,
  protiens: null,
  cuisines: null,
  allergys: null,
  draftOrders: null,
  hasSaved: false,
  orderStatus: null
};

export const initialState = foodSchedularEntity.getInitialState(defaultState);
