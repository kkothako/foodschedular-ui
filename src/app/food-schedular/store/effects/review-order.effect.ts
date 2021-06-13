import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as distanceActions from '../action/review-order.action';
import { Injectable } from '@angular/core';
import { DistanceSearchService } from '../service/review-order.service';

@Injectable()
export class DistanceEffect {
  constructor(private distanceService: DistanceSearchService, private actions: Actions) {

  }

  getLangAndLatEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(distanceActions.getLanAndLat),
      mergeMap(({ customerZipCode, restorentZipCode }) => this.distanceService.getLangandLatitudes(customerZipCode, restorentZipCode).pipe(
        map((result) =>{
         return distanceActions.getLangAndLatSuccess({result: result?.data})
        }),
          catchError((error) => of(distanceActions.getLangAndLatError(error)))
        ))
      )
    );

}
