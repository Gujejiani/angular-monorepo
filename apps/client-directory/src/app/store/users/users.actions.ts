import { UserModel } from '@angular-monorepo/shared-ui';
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
 export const DELETE_USER_SUCCESS = createAction('user deleted success '
 );

 export const UPDATE_USER_ACTION = createAction('update  user', (payload: UserModel) => ({ payload })
 );
 export const UPDATE_USER_SUCCESS = createAction('update  user success', (payload: number) => ({ payload })
 );