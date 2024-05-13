




import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { APIService } from '../../api/api.service';
import * as userActions from './users.actions'
import { Injectable } from '@angular/core';
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../../api/endpoints';
import { UserModel } from '@angular-monorepo/shared';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UsersEffects {
    constructor(private actions$: Actions, private apiService: APIService,) {}

    createNewUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.CREATE_USER_ACTION),
        switchMap( (action) => {
            return  this.apiService.apiCall(CREATE_USER, action.payload).pipe(
            map((user: any) => userActions.SUCCESS_MESSAGE_ACTION({
                title: 'Success',
                message: 'User created successfully!',
                success: true,
                navigationText: String(user?.id) ??'',
                navigationUrl: `/detail/${user?.id  }`
            })),
            catchError(() => of(userActions.ERROR_ACTION({
                title: 'Error Ocurred',
                message: "Can't Create New User",
                success: false
            })))
        )
        
        })
    ));

    fetchUsers$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.GET_USERS_ACTION, userActions.SUCCESS_MESSAGE_ACTION),
        switchMap( () => {
            return  this.apiService.apiCall(GET_USERS).pipe(
            map( (users) => {
                const usersData = users as unknown as UserModel[]
                console.log(users)
                return userActions.GET_USERS_SUCCESS(usersData.reverse())
            },
            
        ),
        catchError( () => {
            return of(userActions.ERROR_ACTION({
            title: 'Error Ocurred',
            message: "Can't fetch users",
            success: false
        }))}
        
        
        )
        
        )
        
        })
    ))
    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.DELETE_USER),
        switchMap( (action) => {
            return  this.apiService.apiCall(DELETE_USER, {id: action.payload}).pipe(
            map((users) => {
                    console.log('user deleted res ', users)
                return userActions.SUCCESS_MESSAGE_ACTION({
                    title: 'Success',
                    message: 'User deleted successfully!',
                    success: true
                })
            },
            catchError(() => of(userActions.ERROR_ACTION({
                title: 'Error Ocurred',
                message: 'Error deleting user',
                success: false
            })))
        ))
        
        })
    ))
    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.UPDATE_USER_ACTION),
        switchMap( (action) => {
          
            return  this.apiService.apiCall(UPDATE_USER, action.payload.user).pipe(
            map((_users) => {

                return userActions.SUCCESS_MESSAGE_ACTION({
                    title: 'Success',
                    message: action.payload.message?? 'User updated successfully!',
                    success: true,
                    navigationText: String(action.payload.user.id) ??'',
                    navigationUrl: `/detail/${action.payload.user.id}`
                })
            },
            catchError(() => of(userActions.ERROR_ACTION({
                title: 'Error Ocurred',
                message:  "Can't update users",
                success: false
            })))
        ))
        
        })
    ))
}