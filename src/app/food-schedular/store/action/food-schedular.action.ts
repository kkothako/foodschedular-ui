import { createAction, props } from '@ngrx/store';
import { CuisineModel } from '../models/cuisine.model';

export const getAllCuisines = createAction(
  '[app-add-food] Get all cuisines'
);
export const getAllCuisinesSuccess = createAction(
  '[app-add-food] Get all cuisines success',
  props<{ response: CuisineModel[] }>()
);
export const getAllCuisinesError = createAction(
  '[app-add-food] Get all cuisines error',
  props<{ error: any }>()
);
