import { createAction, props } from '@ngrx/store';
import { DistanceModel } from '../models/distance.model';

export const getLanAndLat = createAction(
  '[app-review-order-cart] Get Lat and Lang',
  props<{ customerZipCode: string, restorentZipCode: string }>()
);

export const getLangAndLatSuccess = createAction(
  '[app-review-order-cart] Get Lat and Lang Success',
  props<{ result: any }>()
);

export const getLangAndLatError = createAction(
  '[app-review-order-cart] Get Lang and Lat Error',
  props<{ error: any }>()
);
