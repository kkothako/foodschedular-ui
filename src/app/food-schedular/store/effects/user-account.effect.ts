import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import * as action from './../action/user-accout.action';
import { UserAccountService } from '../service/user-account.service';


@Injectable()
export class UserAccountEffect {
  constructor(
    private actions: Actions,
    private userAccountService: UserAccountService) {

  }

  createUserAccountEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(action.createRegistration),
      mergeMap(({ payload }) => this.userAccountService.createUserAccount(payload).pipe(
        map((result: any) => action.createRegistrationSuccess({ response: result.data })),
        catchError((result: any) => of(action.createRegistrationError({ error: result.error }))
        ))
      )
    ));
}
