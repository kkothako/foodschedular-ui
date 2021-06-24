import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as reviewOrderActions from '../action/review-order.action';
import { Injectable } from '@angular/core';
import { DistanceSearchService } from '../service/review-order.service';


@Injectable()
export class DistanceEffect {
  constructor(private distanceService: DistanceSearchService, private actions: Actions) {

  }

  getLangAndLatEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(reviewOrderActions.getLanAndLat),
      mergeMap(({ customerZipCode, restorentZipCode }) => this.distanceService.getLangandLatitudes(customerZipCode, restorentZipCode).pipe(
        map((result) => {
          return reviewOrderActions.getLangAndLatSuccess({ result: result?.data })
        }),
        catchError((error) => of(reviewOrderActions.getLangAndLatError(error)))
      ))
    )
  );

  getAllRestorentsByCuisineIds$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(reviewOrderActions.getAllResotrentsByCusineIds),
      mergeMap(({ cuisineIds }) => this.distanceService.getAllRestorentsByCuisineIds(cuisineIds)
        .pipe(
          map((result) => result?.status ? reviewOrderActions.getAllResotrentsByCusineIdsSuccess({ payload: result?.data }) :
            reviewOrderActions.errorAction({ error: result?.error })),
          catchError((result) => of(reviewOrderActions.errorAction({ error: result?.error })))
        ))
    )
  );

  getAllRestaurentMenusAndTimings$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(reviewOrderActions.getAllRestaurentMenusAndTimings),
      mergeMap(({ restaurentId }) => this.distanceService.getAllRestaurentMenusAndTimings(restaurentId)
        .pipe(
          map((result) => result?.status ? reviewOrderActions.getAllResotrentsByCusineIdsSuccess({ payload: result.data }) :
            reviewOrderActions.errorAction({ error: result?.error })
          ),
          catchError((result) => of(reviewOrderActions.errorAction({ error: result?.error })))
        ))
    )
  );

}

