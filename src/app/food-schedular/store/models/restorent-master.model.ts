import { RestaurentMenuModel } from './restaurent-menu.model';

export interface RestorentMasterModel {
  restaurantId: string;
  restaurantName: string;
  cuisineId: string;
  address: {
    addressLine1: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  },
  deliveryArea: string;
  customerRatings: Number;
  createAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;

}


