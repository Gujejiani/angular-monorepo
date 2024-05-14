import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.reducer";

const selectUsersState = createFeatureSelector<UsersState>("users");

export const selectUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state?.users
);

export const selectUserById = (id: string) =>
  createSelector(selectUsers, (users) =>
    users?.find((user) => String(user.id) === id)
  );

export const selectModalInfo = createSelector(
  selectUsersState,
  (state: UsersState) => state?.modalInfo
);
