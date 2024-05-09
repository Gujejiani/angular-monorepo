import { Action } from '@ngrx/store';
import { UsersState, usersReducer } from "./users/users.reducer";




export function UsersReducerFn(state: UsersState| undefined, action: Action) {
    return usersReducer(state, action);
  }