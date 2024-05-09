


// define effect

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { APIService } from '../../api/api.service';
import * as userActions from './users.actions'
import { Injectable } from '@angular/core';
import { CREATE_USER, GET_USERS } from '../../api/endpoints';
import { UserModel } from '@angular-monorepo/shared-ui';

@Injectable()
export class UsersEffects {
    constructor(private actions$: Actions, private apiService: APIService,) {}

    createNewUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.CREATE_USER_ACTION),
        switchMap( (action) => {
      
        
            return  this.apiService.apiCall(CREATE_USER, action.payload).pipe(
            map(_users => userActions.CREATE_USER_SUCCESS()),
            catchError(() => of({ type: '[Users API] Users Loaded Error' }))
        )
        
        })
    ));

    fetchUsers$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.GET_USERS,userActions.CREATE_USER_SUCCESS),
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
}