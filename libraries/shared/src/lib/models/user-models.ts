import { AccountModel } from "./account-model";

 export interface UserModel {
    id?: number; 
    firstName: string; 
    lastName: string; 
    gender: GenderEnum; 
    personalId: string;
    photo?: string; 
    phoneNumber: number;
    factualAddress: {
      country: string;
      city: string;
      address: string;
    },
    legalAddress: {
      country: string;
      city: string;
      address: string;
    },
    accounts?: AccountModel[];
  }
  export enum GenderEnum {
    MALE='male',
    FEMALE='female',
    BOTH ='All Genders'
  }
 
  export enum AccountStatusEnum {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive'
}

export enum AccountTypeEnum {
  CURRENT = 'Current',
  SAVINGS = 'Savings',
  DEPOSIT = 'Deposit'
}
export enum CurrencyEnum {
  GEL='GEL',
  USD='USD',
  EUR='EUR'
}
