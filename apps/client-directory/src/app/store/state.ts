import { Action } from '@ngrx/store';
import { UserState, usersReducer } from "./user/users.reducer";




export function UsersReducerFn(state: UserState| undefined, action: Action) {
    return usersReducer(state, action);
  }