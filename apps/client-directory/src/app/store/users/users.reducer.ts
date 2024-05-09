import { UserModel } from '@angular-monorepo/shared-ui';



// define reducer

import { createReducer, on, Action } from '@ngrx/store';

import * as Actions from './users.actions'

export interface UsersState {
    users: UserModel[],
    loading: boolean,
    createUserSuccess: boolean
}

export const initialState:  UsersState = {
    users:[],
    loading: false,
    createUserSuccess: false
}

export const usersReducer = createReducer(
  initialState,

    on(Actions.CREATE_USER_ACTION, (state, { payload }) => {
        return {
        ...state,
        };
    }),
    on(Actions.SHOW_LOADING_ACTION, (state, { payload }) => {
        console.log('updating loading')
        return {
            ...state,
            loading: payload
        }
    }),
    on(Actions.CREATE_USER_SUCCESS, (state) => {
        return {
            ...state,
            createUserSuccess: true
        }
    }),
    on(Actions.GET_USERS_SUCCESS, (state, {payload}) => {
        return {
            ...state,
            users: payload
        }
    }),
);


