import { EndPointModel } from '../models/endPoint-model';
import { environment } from './../../../environment';



export const GET_USERS: EndPointModel = {
  api: 'users',
  method: 'GET',
};

export const CREATE_USER: EndPointModel = {
  api: 'users/register',
  method: 'POST',
};

export const PHOTO_URL: EndPointModel = {
  api: environment.photoEndPoint + 'img/users/',
  method: 'GET',
};
export const UPDATE_USER: EndPointModel = {
  api: 'users',
  method: 'PATCH',
  param: true,
};

export const DELETE_USER: EndPointModel = {
  api: 'users',
  method: 'DELETE',
  param: true,
};
