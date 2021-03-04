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
        map((result: any) => result.status ? action.createRegistrationSuccess({
          response: result.data
        }) : action.createRegistrationError({ error: result.error?.errors?.email })),
        catchError((result: any) => of(action.createRegistrationError({ error: result.error }))
        ))
      )
    ));

  validateActivationKeyEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(action.validateActivationKey),
      mergeMap(({ activationKey, userId }) => this.userAccountService.validateActivationKey(activationKey, userId).
        pipe(map((result: any) => result.status ? action.validateActivationKeySuccess({ status: result.status }) :
          action.validateActivationKeyError({ error: result.error }),
          catchError((result: any) => of(action.validateActivationKeyError({ error: result.error }))))))
    ));

    userProfilesEffect$: Observable<Action> = createEffect(
      () => this.actions.pipe(
        ofType(action.getUserProfiles),
        mergeMap(({ userId }) => this.userAccountService.getProfilesByUserId(userId).
          pipe(map((result: any) => result.status ? action.getUserProfilesSuccess({ profiles: result.data }) :
            action.getUserProfilesError({ error: result.error }),
            catchError((result: any) => of(action.getUserProfilesError({ error: result.error }))))))
      ));
}
