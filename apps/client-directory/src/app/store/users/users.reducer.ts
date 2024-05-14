import { ModalData, UserModel } from "@angular-monorepo/shared";

import { createReducer, on } from "@ngrx/store";

import * as Actions from "./users.actions";

export interface UsersState {
  users: UserModel[];
  loading: boolean;
  modalInfo: ModalData;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  modalInfo: {
    title: "",
    message: "",
    success: false,
  },
};

export const usersReducer = createReducer(
  initialState,

  on(Actions.CREATE_USER_ACTION, (state, { payload }) => {
    return {
      ...state,
    };
  }),
  on(Actions.SHOW_LOADING_ACTION, (state, { payload }) => {
    return {
      ...state,
      loading: payload,
    };
  }),
  on(Actions.SUCCESS_MESSAGE_ACTION, (state, { payload }) => {
    return {
      ...state,
      modalInfo: payload,
    };
  }),

  on(Actions.GET_USERS_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      users: payload,
    };
  }),
  on(Actions.ERROR_ACTION, (state, { payload }) => {
    return {
      ...state,
      modalInfo: payload,
    };
  }),
  on(Actions.RESET_MODAL, (state) => {
    return {
      ...state,
      modalInfo: {
        title: "",
        message: "",
        success: false,
      },
    };
  })
);
