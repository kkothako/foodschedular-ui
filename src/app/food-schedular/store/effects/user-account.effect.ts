import { Action, resultMemoize } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import * as action from '../action/user-account.action';
import * as preferencesAction from '../action/user-preferences.action';
import { UserAccountService } from '../service/user-account.service';
import * as loginActions from './../action/user-account-login';
import { UserPreferencesService } from '../service/user-preferences.service';

@Injectable()
export class UserAccountEffect {
  constructor(
    private actions: Actions,
    private userAccountService: UserAccountService,
    private userPreferencesService: UserPreferencesService) {

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

    userProfileByProfileIdEffect$: Observable<Action> = createEffect(
      () => this.actions.pipe(
        ofType(action.getUserProfileByProfileId),
        mergeMap(({ userId, profileId }) => this.userAccountService.getProfileByProfileId(userId, profileId).
          pipe(map((result: any) => result.status ? action.getUserProfileByProfileIdSuccess({ profiles: result.data }) :
            action.getUserProfileByProfileIdError({ error: result.error }),
            catchError((result: any) => of(action.getUserProfileByProfileIdError({ error: result.error }))))))
      ));


  validateLoginEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(loginActions.validateLogin),
      mergeMap(({ payload }) => this.userAccountService.validateLogin(payload).pipe(
        map((result: any) => result?.status ? loginActions.validateLoginSuccess({ response: result?.data }) : loginActions.validateLoginError({ error: result.error }),
          catchError((result: any) => of(loginActions.validateLoginError({ error: result.error }))),
        )
      ))
    )
  );

  createUserProfileEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(action.createUserProfile),
      mergeMap(({ payload }) => this.userAccountService.createUserProfile(payload).pipe(
        map((result: any) => result?.status ? action.createUserProfileSuccess({ response: result?.data }) : action.createUserProfileError({ error: result.error }),
          catchError((result: any) => of(action.createUserProfileError({ error: result.error }))),
        )
      ))
    )
  );

  createUserPreferencesEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(preferencesAction.createPreferences),
      mergeMap(({ payload }) => this.userPreferencesService.createPreferences(payload).pipe(
        map((result: any) => result.status ? preferencesAction.createPreferencesSuccess({
          response: result.data
        }) : preferencesAction.createPreferencesError({ error: result.error })),
        catchError((result: any) => of(preferencesAction.createPreferencesError({ error: result.error }))
        ))
      )
    ));

  getUserPreferencesEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(preferencesAction.getPreferences),
      mergeMap(({ userId }) => this.userPreferencesService.getPreferencesByUserId(userId).
        pipe(map((result: any) => result?.status ? preferencesAction.getPreferencesSuccess({ response: result?.data }) :
          preferencesAction.getPreferencesError({ error: result.error }),
          catchError((result: any) => of(preferencesAction.getPreferencesError({ error: result?.error }))))))
    ));

  getAddressEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(action.getAddress),
      mergeMap(({ zipCode }) => this.userAccountService.getAdrressByZipCode(zipCode).pipe(
        map((result: any) => action.getAddressSuccess({
          response: result
        })),
        catchError((error: any) => of(preferencesAction.createPreferencesError({ error: error }))
        ))
      )
    ));

  deleteUserProfileById$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(action.deleteProfileById),
      mergeMap(({ profileId }) => this.userAccountService.deleteProfileById(profileId).pipe(
        map((result) => result?.status ? action.deleteProfileByIdSucccess({ response: result?.data }) :
          action.deleteProfileByIdError({ error: result?.error }),
          catchError((result) => of(action.deleteProfileByIdError({ error: result?.error })))
        )
      ))
    )
  );

  forGotPasswordEffect$: Observable<Action> = createEffect(
    () => this.actions.pipe(
      ofType(action.forGotPassword),
      mergeMap(({ emailId }) => this.userAccountService.forGotPasswordByEmailId(emailId).pipe(
        map((result) => result?.status ? action.forGotPasswordSuccess({ response: result?.data }) :
          action.validateActivationKeyError({ error: result?.error })),
        catchError((result) => of(action.validateActivationKeyError({ error: result?.error })))
      ))
    )
  );
}
