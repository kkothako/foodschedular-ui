import { createAction, props } from '@ngrx/store';
import { UserAccountRegistrationModel } from '../models/user-account.model';

export const validateLogin = createAction(
  '[app-login] Validate user login',
  props<{payload: UserAccountRegistrationModel}>()
);

export const validateLoginSuccess = createAction(
  '[app-login] Validate user login success',
  props<{response: UserAccountRegistrationModel}>()
);

export const validateLoginError = createAction(
  '[app-login] Validate user login error',
  props<{error: any}>()
);

export const logoutAction = createAction(
  '[app-toolbar] Logout action'
);
