import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const appState = createFeatureSelector<AppState>('appState');

export const reviewOrderState = createSelector(
  appState,
  state => state.reviewOrderState
);

export const getAll5MilesZipCodes = createSelector(
  reviewOrderState,
  state => state.in5MilesAllZipCodes
);

