import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as reviewOrderActions from '../action/review-order.action';
import { Injectable } from '@angular/core';
import { ReviewOrderService } from '../service/review-order.service';


@Injectable()
export class DistanceEffect {
  constructor(private reviewOrderService: ReviewOrderService, private actions: Actions) {

  }

  getLangAndLatEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(reviewOrderActions.getLanAndLat),
      mergeMap(({ customerZipCode, restorentZipCode }) => this.reviewOrderService.getLangandLatitudes(customerZipCode, restorentZipCode).pipe(
        map((result) => {
          return reviewOrderActions.getLangAndLatSuccess({ result: result?.data })
        }),
        catchError((error) => of(reviewOrderActions.getLangAndLatError(error)))
      ))
    )
  );

  getAllRestorentsByCuisineIds$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(reviewOrderActions.getAllRestaurentsByZipCodes),
      mergeMap(({ zipCodes }) => this.reviewOrderService.getAllRestorentsByZipCodes(zipCodes)
        .pipe(
          map((result) => result?.status ? reviewOrderActions.getAllRestaurentsByZipCodesSuccess({ payload: result?.data }) :
            reviewOrderActions.errorAction({ error: result?.error })),
          catchError((result) => of(reviewOrderActions.errorAction({ error: result?.error })))
        ))
    )
  );

  getAllRestaurentMenusAndTimings$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(reviewOrderActions.getAllRestaurentMenusAndTimings),
      mergeMap(({ restaurentIds }) => this.reviewOrderService.getAllRestaurentMenusAndTimings(restaurentIds)
        .pipe(
          map((result) => result?.status ? reviewOrderActions.getAllRestaurentMenusAndTimingsSuccess({ payload: result.data }) :
            reviewOrderActions.errorAction({ error: result?.error })
          ),
          catchError((result) => of(reviewOrderActions.errorAction({ error: result?.error })))
        ))
    )
  );

  getAllWithIn5MilesZipCodes$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(reviewOrderActions.getAllZipCodesByCustomerZipCode),
      mergeMap(({ customerZipCode }) => this.reviewOrderService.getAllZipCodesByCustomerZipCode(customerZipCode).pipe(
        map((result) => reviewOrderActions.getAllZipCodesByCustomerZipCodeSuccess({ payload: result?.data })),
        catchError((result) => of(reviewOrderActions.errorAction({ error: result })))
      ))
    )
  );

}


