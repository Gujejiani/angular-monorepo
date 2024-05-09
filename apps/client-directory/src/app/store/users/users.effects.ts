


// define effect

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { APIService } from '../../api/api.service';
import * as userActions from './users.actions'
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';

@Injectable()
export class UsersEffects {
    constructor(private actions$: Actions, private apiService: APIService) {}

    createNewUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.CREATE_USER_ACTION),
        switchMap( (action) => {
      
        
            return  this.apiService.post(`${environment.dbEndPoint}users`, action.payload).pipe(
            map(users => ({ type: '[Users API] Users Loaded Success', payload: users })),
            catchError(() => of({ type: '[Users API] Users Loaded Error' }))
        )
        
        })
    ));
}