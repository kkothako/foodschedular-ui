import { AddressModel } from './user-account.model';

export interface UserProfileModel {
  id: string;
  userId: string;
  nickName: string;
  firstName: string;
  lastName: string;
  mobile: string;
  address:AddressModel;
}
