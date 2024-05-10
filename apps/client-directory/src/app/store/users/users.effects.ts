


// define effect

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { APIService } from '../../api/api.service';
import * as userActions from './users.actions'
import { Injectable } from '@angular/core';
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../../api/endpoints';
import { UserModel } from '@angular-monorepo/shared-ui';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UsersEffects {
    constructor(private actions$: Actions, private apiService: APIService,) {}

    createNewUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.CREATE_USER_ACTION),
        switchMap( (action) => {
            const userWithId = { ...action.payload, id: uuidv4() }
        
            return  this.apiService.apiCall(CREATE_USER, userWithId).pipe(
            map(_users => userActions.CREATE_USER_SUCCESS()),
            catchError(() => of({ type: '[Users API] Users Loaded Error' }))
        )
        
        })
    ));

    fetchUsers$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.GET_USERS_ACTION,userActions.CREATE_USER_SUCCESS, userActions.DELETE_USER_SUCCESS),
        switchMap( () => {
            return  this.apiService.apiCall(GET_USERS).pipe(
            map((users) => {
                const usersData = users as unknown as UserModel[]
                console.log(users)
                return userActions.GET_USERS_SUCCESS(usersData)
            },
            catchError(() => of({ type: '[Users API] Users Loaded Error' }))
        ))
        
        })
    ))
    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.DELETE_USER),
        switchMap( (action) => {
            return  this.apiService.apiCall(DELETE_USER, {id: action.payload}).pipe(
            map((users) => {
                    console.log('user deleted res ', users)
                return userActions.DELETE_USER_SUCCESS()
            },
            catchError(() => of({ type: '[Users API] Users Loaded Error' }))
        ))
        
        })
    ))
    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.UPDATE_USER_ACTION),
        switchMap( (action) => {
            return  this.apiService.apiCall(UPDATE_USER, action.payload).pipe(
            map((_users) => {

                return userActions.DELETE_USER_SUCCESS()
            },
            catchError(() => of({ type: '[Users API] Users Loaded Error' }))
        ))
        
        })
    ))
}