import { Store } from '@ngrx/store';
import { UserModel, englishPattern, genderValidator, georgianPattern, patternValidator, startsWithValidator } from "@angular-monorepo/shared-ui";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import * as Actions from '../store/users/users.actions';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private formBuilder: FormBuilder, private store: Store) {}



    createUser(user: UserModel){
        this.store.dispatch(Actions.CREATE_USER_ACTION(user))
    }
    
    
    getUserForm (){
        return this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50, ), patternValidator(georgianPattern, englishPattern)] ],
            lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), patternValidator(georgianPattern, englishPattern)]],
        
            
            legalAddress: this.formBuilder.group({
              country: ['', [Validators.required]],
              city: ['', [Validators.required]],
              address: ['', [Validators.required]],
            }),
            factualAddress: this.formBuilder.group({
              country: ['', [Validators.required]],
              city: ['', [Validators.required]],
              address: ['', [Validators.required]],
            }),
            photo: [''],
            gender: ['male', [Validators.required, genderValidator()]],
            personalId: ['',[Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
            phoneNumber: ['',[Validators.required,  Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$'), startsWithValidator('5')]],
            
          });
    }
}