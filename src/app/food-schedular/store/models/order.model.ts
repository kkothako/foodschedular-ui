export interface OrderModel {
  id: string;
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
}