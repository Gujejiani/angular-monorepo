import { ModalData, UserModel } from '@angular-monorepo/shared';
import { createAction } from '@ngrx/store';



export const CREATE_USER_ACTION = createAction('create user action',
 (payload: UserModel) => ({ payload })
 );

 export const CREATE_USER_SUCCESS= createAction('create user action success'
 );

 export const SHOW_LOADING_ACTION = createAction('change loading status',
 (payload: boolean) => ({ payload })
 );

 export const GET_USERS_ACTION = createAction('get users '
 );
 export const GET_USERS_SUCCESS = createAction('get users success',
 (payload: UserModel[]) => ({ payload })
 );

 export const DELETE_USER = createAction('delete  user', (payload: number) => ({ payload })
 );

 export const UPDATE_USER_ACTION = createAction('update  user', (payload: {user: UserModel, message?: string}) => ({ payload })
 );


 export const ERROR_ACTION = createAction('error action', (payload: ModalData) => ({ payload }));


export const SUCCESS_MESSAGE_ACTION = createAction('success message action', (payload: ModalData) => ({ payload }));

 export const RESET_MODAL = createAction('reset modal  '
 );