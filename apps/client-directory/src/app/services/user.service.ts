import { AppModalService } from './app-modal.service';
import { Store } from '@ngrx/store';
import { UserModel, englishPattern, genderValidator, georgianPattern, patternValidator, startsWithValidator } from "@angular-monorepo/shared-ui";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import * as Actions from '../store/users/users.actions';
import * as Selectors from '../store/users/users.selectors';
import { APIService } from '../api/api.service';
import { GET_USERS } from '../api/endpoints';
import { Router } from '@angular/router';
@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private formBuilder: FormBuilder, private store: Store, private apiService: APIService, private router: Router, private appModalService: AppModalService) {}

  fetchUsers(){
    this.store.dispatch(Actions.GET_USERS_ACTION())
  
  }

  fetchUserById(id: string) : any{
 
    return  this.apiService.apiCall(GET_USERS, {id})
  }

  getUsers(){
   return this.store.select(Selectors.selectUsers)
  }
  
  getUSerById(id: string){
    return this.store.select(Selectors.selectUserById(id))
  
  }

  createUser(user: UserModel){
        this.store.dispatch(Actions.CREATE_USER_ACTION(user))
  }
  updateUser(user: UserModel){

    this.store.dispatch(Actions.UPDATE_USER_ACTION(user))
  
  }

  deleteUser(id: number){
    this.appModalService.showModal({
      title: 'Delete user',
      message: 'Are you sure you want to delete this user?',
      success: false,
      returnOutput: true,
      confirmButtonText: 'Confirm'
    })?.subscribe((confirm)=>{
          if(confirm){
            this.store.dispatch(Actions.DELETE_USER(id))
            this.appModalService.closeModal()
            this.navigateToCliensPage()
          }else {
            this.appModalService.closeModal()
          }
     
    })
  
  }


  editUser(id:number ){
    this.router.navigate([`/add-client/0`,], {
      queryParams: {
        editingId: id
      }
    })
  }
  navigateToCliensPage(){
    this.router.navigate(['/clients'])
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