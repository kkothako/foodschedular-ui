import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { FoodSchedularService } from '../service/food-schedular.service';

import * as schedularActions from './../action/food-schedular.action';
import * as orderActions from '../action/order.action';

@Injectable()
export class FoodSchedularEffect {

  constructor(private actions: Actions,
    private foodSchedularService: FoodSchedularService) {

  }
  getAllCuisines$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(schedularActions.getAllCuisines),
      mergeMap(() => this.foodSchedularService.getAllCuisines().pipe(
        map((result) => result?.status ? schedularActions.getAllCuisinesSuccess({ response: result?.data }) :
          schedularActions.getAllCuisinesSuccess({ response: result?.error }),
          catchError((result) => of(schedularActions.getErrorAction({ error: result?.error })))
        ))
      ))
  );

  getAllProtiensEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(schedularActions.getAllProtiens),
      mergeMap(() => this.foodSchedularService.getAllProtiens().pipe(
        map((result) => result?.status ? schedularActions.getAllProtiensSuccess({ response: result?.data }) :
          schedularActions.getErrorAction({ error: result?.error })),
        catchError((result) => of(schedularActions.getErrorAction({ error: result?.error })))
      ))
    )
  );

  createDraftOrderEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(orderActions.createDraftOrder),
      mergeMap(({ payload }) => this.foodSchedularService.createDraftOrder(payload).pipe(
        map((result) => result?.status ? orderActions.createDraftOrderSuccess({ result: result?.status }) :
          orderActions.orderError({ error: result?.error })),
        catchError((result) => of(orderActions.orderError({ error: result?.error })))
      ))
    )
  );
}
