import { Observable } from 'rxjs';

export interface CuisineModel {
  cuisineID: string;
  cuisineName: string;
  createAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;
  _id: string;
}

export interface ProtienModel {
  proteinID: string;
  _id: string;
  proteinName: string;
  createAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;
}

export interface AllergyModel {
  allergyID: string;
  allergyName: string;
  createAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;
}

