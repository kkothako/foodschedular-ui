export interface OrderHistoryModel {
  _id: string;
  profileId: string;
  userId: string;
  proteinId: string;
  cuisineId: string;
  menuId: string;
  restaurentId: string;
  scheduleDate: string;
  price: number;
  orderStatus: string;
  createdAt: Date;
  updatedAt: Date;

  proteinName: string;
  cuisineName: string;
}
