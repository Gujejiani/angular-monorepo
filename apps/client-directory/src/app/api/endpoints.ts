import { EndPointModel } from "../models/endPoint-model";
import { environment } from "./../../../environment";

export const GET_USERS: EndPointModel = {
  api: "users",
  method: "GET",
  url: environment.dbEndPoint,
};

export const CREATE_USER: EndPointModel = {
  api: "users",
  method: "POST",
  url: environment.dbEndPoint,
};
export const SAVE_PHOTO: EndPointModel = {
  api: "save-photo",
  method: "POST",
  url: environment.photoEndPoint,
};
export const PHOTO_URL: EndPointModel = {
  api: "assets/",
  method: "GET",
  url: environment.photoEndPoint,
};

export const UPDATE_USER: EndPointModel = {
  api: "users",
  method: "PATCH",
  param: true,
  url: environment.dbEndPoint,
};

export const DELETE_USER: EndPointModel = {
  api: "users",
  method: "DELETE",
  param: true,
  url: environment.dbEndPoint,
};
