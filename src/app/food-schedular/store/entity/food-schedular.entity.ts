import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { FoodSchedularModel } from '../models/food-schedular.model';

export const foodSchedularEntity: EntityAdapter<FoodSchedularModel> = createEntityAdapter<FoodSchedularModel>()
