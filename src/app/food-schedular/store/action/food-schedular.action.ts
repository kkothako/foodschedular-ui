import { createAction, props } from '@ngrx/store';
import { AllergyModel, CuisineModel, ProtienModel } from '../models/cuisine.model';

export const getAllCuisines = createAction(
  '[app-add-food] Get all cuisines'
);
export const getAllCuisinesSuccess = createAction(
  '[app-add-food] Get all cuisines success',
  props<{ response: CuisineModel[] }>()
);
export const getErrorAction = createAction(
  '[app-add-food] Get all cuisines error',
  props<{ error: any }>()
);

export const getAllProtiens = createAction(
  '[app-add-food] Get all protiens'
);
export const getAllProtiensSuccess = createAction(
  '[app-add-food] Get all protiens success',
  props<{ response: ProtienModel[] }>()
);

export const getAllAllergys = createAction(
  '[app-add-food] Get all allergys'
);
export const getAllAllergysSuccess = createAction(
  '[app-add-food] Get all allergys success',
  props<{ response: AllergyModel[] }>()
);
