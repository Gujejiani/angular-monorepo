import { UserService } from './../../services/user.service';
import { UIClientFormContainerComponent, maxImumNumberOfUserFormPages, UserModel } from '@angular-monorepo/shared';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientFormSectionNames } from 'libraries/shared/src/lib/models';
import {  FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule ,UIClientFormContainerComponent],
  templateUrl: './client-form-container.component.html',
  styleUrl: './client-form-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormContainerComponent  implements OnInit , OnDestroy{
  constructor( private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadFormFromLocalStorage();
    if(this.editingId){
      this.editingUser$ = this.userService.getUSerById(this.editingId)
    }
  }

 selectedSection = ClientFormSectionNames.PERSONAL;
 SECTIONS = ClientFormSectionNames;
 editingUser$: Observable<UserModel | undefined> | null =null;
 @Input({required: true}) userForm: FormGroup  =new FormGroup({});
@Input({
    transform: (value: string) => Number(value),
  }) id  = 0;

  @Input() editingId = '';
  /**
   * 
   * @param formPageIndex 
   */
  formPageIndexChanged(formPageIndex: number) {
      if(formPageIndex<maxImumNumberOfUserFormPages){
        localStorage.setItem('insideFormNav', 'true');
          this.router.navigate(['/add-client', formPageIndex], {
          queryParamsHandling: 'preserve',
          })   
      }
      this.saveFormToLocalStorage()
  }

  photoUploaded(event: File){
    this.userForm.patchValue({photo: event})
    this.userForm.markAsDirty()
  }
  fromSubmitted({user, update}: {user: UserModel, update?: boolean}){
    user.id = uuidv4() // generate random id

    if(!update){
      this.userService.createUser(user)
      this.userForm.reset()
      this.router.navigate(['/add-client', 0],)  
      localStorage.removeItem('userFormData')
      
      
    }else {
    
      user.id = this.editingId as any
      this.userService.updateUser(user)  
      this.userForm.markAsUntouched();
    }
    if(user.photo){
      this.saveUserImage(user)
    }
  }

  saveUserImage(user: UserModel){
  
    const form = new FormData()
    form.append('id', JSON.stringify(user.id))
    form.append('photo', user.photo as any)
    this.userService.saveImage(form)
  }
  /**
   * Save form values to local storage
   */
  saveFormToLocalStorage(): void {
    const formValues = this.userForm.value;
    localStorage.setItem('userFormData', JSON.stringify(formValues));
  }
  /**
   * Load form values from local storage
   */
  loadFormFromLocalStorage(): void {
    const storedFormValues = localStorage.getItem('userFormData');
    if (storedFormValues) {
      const parsedFormValues = JSON.parse(storedFormValues);
      this.userForm.patchValue(parsedFormValues);
    }
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id)
    this.userForm.reset()
    this.router.navigate(['/add-client', 0],)  
  }

  ngOnDestroy(): void {
    if(this.editingId){
      localStorage.removeItem('userFormData')
    }
      this.userService.closeModal()
  }
}
