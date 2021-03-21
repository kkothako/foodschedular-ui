import { createAction, props } from '@ngrx/store';

import * as model from './../models/preferences.model';

export const createPreferences = createAction(
    '[user-preferences] Create Preferences',
    props<{ payload: model.PreferencesModel }>()
  );
  export const createPreferencesSuccess = createAction(
    '[user-preferences] Create Preferences success',
    props<{ response: boolean }>()
  );
  export const createPreferencesError = createAction(
    '[user-preferences] Create Preferences error',
    props<{ error: any }>()
  );
