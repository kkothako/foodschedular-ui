import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import { UserAccountModel } from '../models/user-account.model';

export const userAccountEntity: EntityAdapter<UserAccountModel> = createEntityAdapter<UserAccountModel>();
