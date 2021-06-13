import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ReviewOrderModel } from '../models/review-order.model';

export const reviewOrderEntity:EntityAdapter<ReviewOrderModel> =
createEntityAdapter<ReviewOrderModel>();
