import { FoodSchedularState } from './food-schedular.state';
import { ReviewOrderState } from './review-order.state';
import { UserAccountState } from './user-account.state';

export interface AppState{
  userAccountState: UserAccountState;
  foodSchedularState: FoodSchedularState,
  reviewOrderState: ReviewOrderState
}
