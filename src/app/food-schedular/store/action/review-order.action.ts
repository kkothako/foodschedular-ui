import { createAction, props } from '@ngrx/store';
import { DistanceModel } from '../models/distance.model';
import { RestaurentMenuModel } from '../models/restaurent-menu.model';
import { RestorentMasterModel } from '../models/restorent-master.model';
import { ZipCodeModel } from '../models/zipcode.model';

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

export const getAllRestaurentsByZipCodes = createAction(
  '[app-review-order-cart] Get all restorents by zipcodes',
  props<{ zipCodes: string[] }>()
);

export const getAllRestaurentsByZipCodesSuccess = createAction(
  '[app-review-order-cart] Get all restorents by zipcodes success',
  props<{ payload: RestorentMasterModel[] }>()
);

export const errorAction = createAction(
  '[app-review-order-cart] Show errors',
  props<{ error: any }>()
);

export const getAllRestaurentMenusAndTimings = createAction(
  '[app-review-order-cart] Get all restaurent menus and timings',
  props<{ restaurentIds: string[] }>()
);

export const getAllRestaurentMenusAndTimingsSuccess = createAction(
  '[app-review-order-cart] Get all restaurent menu and timing success',
  props<{ payload: RestaurentMenuModel[] }>()
);

export const getAllZipCodesByCustomerZipCode = createAction(
  '[app-review-order-cart] Get all zip codes with in 5 miles from customer zipcode',
  props<{ customerZipCode: string }>()
);

export const getAllZipCodesByCustomerZipCodeSuccess = createAction(
  '[app-review-order-cart] Get all zip codes with in 5 miles from customer zipcode success',
  props<{ payload: ZipCodeModel[] }>()
);
