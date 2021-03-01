export interface UserAccountModel {
  loginUser: UserAccountRegistrationModel;
  hasLoggedIn: boolean;

}

export interface UserAccountRegistrationModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  role: string;
  address: AddressModel;
  isActive: boolean;
  createAt: Date;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface AddressModel {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
