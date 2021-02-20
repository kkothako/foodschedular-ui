import { createAction, props } from '@ngrx/store';

import * as model from './../models/user-account.model';

export const createRegistration = createAction(
  '[app-registration] Create registration',
  props<{ payload: model.UserAccountRegistrationModel }>()
);
export const createRegistrationSuccess = createAction(
  '[app-registration] Create registration success',
  props<{ response: model.UserAccountRegistrationModel }>()
);
export const createRegistrationError = createAction(
  '[app-registration] Create registration error',
  props<{ error: any }>()
);

