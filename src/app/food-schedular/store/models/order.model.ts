import { RestaurentMenuModel } from './restaurent-menu.model';
import { RestorentMasterModel } from './restorent-master.model';

export interface OrderModel {
  id: String,
  cuisineID: string;
  cuisineName: string;
  proteinID: string;
  proteinName: string;
  scheduledDate: string;
  profileId: string;
  userId: string;
  createAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;
  restaurent: RestorentMasterModel;
  restaurentMenu: RestaurentMenuModel
}
