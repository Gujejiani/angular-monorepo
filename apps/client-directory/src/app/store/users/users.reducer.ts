import { UserModel } from '@angular-monorepo/shared-ui';



// define reducer

import { createReducer, on, Action } from '@ngrx/store';

import * as Actions from './users.actions'

export interface UserState {
    users: UserModel[]
    loading: boolean
}

export const initialState:  UserState = {
    users:[],
    loading: false
}

export const usersReducer = createReducer(
  initialState,

    on(Actions.CREATE_USER_ACTION, (state, { payload }) => {
        return {
        ...state,
        payload,
        };
    }),
    on(Actions.SHOW_LOADING_ACTION, (state, { payload }) => {
        console.log('updating loading')
        return {
            ...state,
            loading: payload
        }
    }),
);


