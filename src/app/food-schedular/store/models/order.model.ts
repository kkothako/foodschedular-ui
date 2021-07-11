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

  orderId: string;
  menuId: string;
  price: number;
  orderStatus: string;
  restaurentId: string;
  proteinId:string;
  cuisineId: string;
  scheduleDate: string
}

export interface OrderMasterModel {
  orderId: string;
  profileId: string;
  userId: string;
  totalAmount: number;
  paidAmmount: number;
  tax: number;
  orderStatus: string;
  upDatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface OrderMasterRequestModel{
  orderMaster:OrderMasterModel;
  orders:OrderModel[];
}
