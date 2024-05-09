import { UserModel } from '@angular-monorepo/shared-ui';
import { createAction } from '@ngrx/store';
// define acitons

export const CREATE_USER_ACTION = createAction('create user action',
 (payload: UserModel) => ({ payload })
 );

 export const SHOW_LOADING_ACTION = createAction('change loading status',
 (payload: boolean) => ({ payload })
 );