import { EntityState } from '@ngrx/entity';
import { foodSchedularEntity } from '../entity/food-schedular.entity';
import { CuisineModel, ProtienModel } from '../models/cuisine.model';
import { FoodSchedularModel } from '../models/food-schedular.model';

export interface FoodSchedularState extends EntityState<FoodSchedularModel> {
  load: boolean,
  error: any,
  protiens: ProtienModel[],
  cuisines: CuisineModel[]

}

export const defaultState: FoodSchedularState = {
  entities: {},
  ids: null,
  load: false,
  error: null,
  protiens: null,
  cuisines: null
};

export const initialState = foodSchedularEntity.getInitialState(defaultState);
