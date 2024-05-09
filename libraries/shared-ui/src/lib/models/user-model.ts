import { AccountModel } from "./account-model";

 export interface UserModel {
    id?: number; 
    firstName: string; // Text, mandatory, 2-50 characters, supports Georgian or Latin alphabets only, not both together
    lastName: string; // Text, mandatory, 2-50 characters, supports Georgian or Latin alphabets only, not both together
    gender: 'female' | 'male'; 
    personalId: string; // Text, mandatory, 11 characters
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
  