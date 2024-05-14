import { GenderEnum, UserModel } from "../models/user-models";

export const maxImumNumberOfUserFormPages = 3;

export const mockUser: UserModel = {
  id: "542323",
  firstName: "Mock User",
  lastName: "from mock folder",
  legalAddress: {
    country: "Georgia",
    city: "Tbilisi",
    address: "Georgia",
  },
  factualAddress: {
    country: "Georgia",
    city: "Tbilisi",
    address: "Georgia",
  },
  photo: "./",
  gender: GenderEnum.MALE,
  personalId: "23232323223",
  phoneNumber: 598829272,
};
