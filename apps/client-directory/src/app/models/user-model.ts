import { AccountModel } from "./account-model";

 export interface UserModel {
    id: number; 
    firstName: string; // Text, mandatory, 2-50 characters, supports Georgian or Latin alphabets only, not both together
    lastName: string; // Text, mandatory, 2-50 characters, supports Georgian or Latin alphabets only, not both together
    gender: 'female' | 'male'; 
    personalId: string; // Text, mandatory, 11 characters
    mobile: string; // 9-digit number, mandatory, starting with 5
    legalAddress: string; 
    country: string;
    city: string; 
    address: string; 
    factualAddress?: string; 
    photo?: string; 
    accounts?: AccountModel[];
  }
  