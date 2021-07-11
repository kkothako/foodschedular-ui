export interface RestaurentMenuModel {
  menuName: string;
  restaurantId: string;
  proteinId: string;
  specialInstructions: string;
  allergy: string;
  ingredients: string;
  price: number;
  createAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;
  restaurentMenu: RestaurentTimingsModel;
}

export interface RestaurentTimingsModel {
  _id:string;
  restaurantId: string;
  dayOfTheWeek: string;
  openTime: string;
  closeTime: string;
  createAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;
  Price: number;
}
