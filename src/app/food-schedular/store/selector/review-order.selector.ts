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

export const selectAllRestaurents = createSelector(
  reviewOrderState,
  state => state.restorents
);


export const selectDraftOrderWithPriceDetails = createSelector(
  appState,
  reviewOrderState,
  (state, orderState) => {
    if (state.foodSchedularState && state.foodSchedularState.draftOrders &&
      orderState.restaurentMenusPlusTimings) {
      const draftOrders = state.foodSchedularState.draftOrders;
      draftOrders?.forEach(order => {
        const restaurents = orderState.restorents?.filter(restaurent => restaurent.cuisineId === order.cuisineID);
        if (restaurents) {

          const randomIndex = Math.floor(Math.random() * restaurents.length);
          const randomRestaurent = restaurents[randomIndex];
          order.restaurent = randomRestaurent;

          const restaurentMenuWithPrice = orderState.restaurentMenusPlusTimings.filter(menu => menu.restaurantId === randomRestaurent.restaurantId);
          const randomCount = Math.floor(Math.random() * restaurentMenuWithPrice.length);
          const randonRestaurentMenu = restaurentMenuWithPrice[randomCount];
          order.restaurentMenu = randonRestaurentMenu;
        }

      });
      return draftOrders;
    }


  }
);

export const selectIfAnyErrors = createSelector(
  reviewOrderState,
  state => state.errors
);

export const selectLoad = createSelector(
  reviewOrderState,
  state => state.load
);
