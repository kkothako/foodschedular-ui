import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import * as action from './../action/user-preferences.action';
import { UserPreferencesService } from '../service/user-preferences.service';

@Injectable()
export class UserPreferencesEffect {
  constructor(
    private actions: Actions,
    private userPreferencesService: UserPreferencesService) {

  }

  createUserPreferencesEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(action.createPreferences),
      mergeMap(({ payload }) => this.userPreferencesService.createPreferences(payload).pipe(
        map((result: any) => result.status ? action.createPreferencesSuccess({
          response: result.data
        }) : action.createPreferenceError({ error: result.error?.errors?.email })),
        catchError((result: any) => of(action.createPreferenceError({ error: result.error }))
        ))
      )
    ));
}