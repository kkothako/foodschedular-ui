import { createAction, props } from '@ngrx/store';
import { DistanceModel } from '../models/distance.model';
import { RestorentMasterModel } from '../models/restorent-master.model';

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

export const getAllResotrentsByCusineIds = createAction(
  '[app-review-order-cart] Get all restorents by cuisineIds',
  props<{ cuisineIds: string[] }>()
);

export const getAllResotrentsByCusineIdsSuccess = createAction(
  '[app-review-order-cart] Get all restorents by cuisineIds success',
  props<{ payload: RestorentMasterModel[] }>()
);

export const errorAction = createAction(
  '[app-review-order-cart] Show errors',
  props<{error: any}>()
);
