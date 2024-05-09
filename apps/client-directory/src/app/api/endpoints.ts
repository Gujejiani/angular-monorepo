import { EndPointModel } from '../models/endPoint-model';
import { environment } from './../../../environment';



export const GET_USERS: EndPointModel = {
  api: 'users',
  method: 'GET',
  url: environment.dbEndPoint,
};

export const CREATE_USER: EndPointModel = {
  api: 'users',
  method: 'POST',
  url: environment.dbEndPoint,
};

// export const PHOTO_URL: EndPointModel = {
//   api: environment.photoEndPoint + 'img/users/',
//   method: 'GET',
// };
export const UPDATE_USER: EndPointModel = {
  api: 'users',
  method: 'PATCH',
  param: true,
  url: environment.dbEndPoint,
};

export const DELETE_USER: EndPointModel = {
  api: 'users',
  method: 'DELETE',
  param: true,
  url: environment.dbEndPoint,
};
