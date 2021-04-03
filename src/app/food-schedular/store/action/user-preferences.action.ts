import { createAction, props } from '@ngrx/store';

import * as model from './../models/preferences.model';

export const createPreferences = createAction(
    '[user-preferences] Create Preferences',
    props<{ payload: model.PreferencesModel }>()
  );
  export const createPreferencesSuccess = createAction(
    '[user-preferences] Create Preferences success',
    props<{ response: model.PreferencesModel[] }>()
  );
  export const createPreferencesError = createAction(
    '[user-preferences] Create Preferences error',
    props<{ error: any }>()
  );

  export const getPreferences = createAction(
    '[user-preferences] Get Preferences',
    props<{ userId: string }>()
  );
  export const getPreferencesSuccess = createAction(
    '[user-preferences] Get Preferences success',
    props<{ response: model.PreferencesModel[] }>()
  );
  export const getPreferencesError = createAction(
    '[user-preferences] Get Preferences error',
    props<{ error: any }>()
  );
