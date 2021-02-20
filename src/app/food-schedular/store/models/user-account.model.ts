export interface UserAccountModel {
  loginUser: UserAccountRegistrationModel;
  hasLoggedIn: boolean;

}

export interface UserAccountRegistrationModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passowrd: string;
  mobile: string;
  role: string;
  address: {
    addressLine1: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  },
  isActive: boolean;
  createAt: Date;
}

export interface LoginModel {
  email: string;
  password: string;
}
