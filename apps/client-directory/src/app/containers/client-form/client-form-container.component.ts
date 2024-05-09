import { Store } from '@ngrx/store';
import { UserService } from './../../services/user.service';
import { UIClientFormContainerComponent, maxImumNumberOfUserFormPages } from '@angular-monorepo/shared-ui';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ClientFormSectionNames } from 'libraries/shared-ui/src/lib/models';
import {  FormGroup } from '@angular/forms';
import { SHOW_LOADING_ACTION } from '../../store/user/user.actions';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, RouterModule, UIClientFormContainerComponent],
  templateUrl: './client-form-container.component.html',
  styleUrl: './client-form-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormContainerComponent  implements OnInit {
 selectedSection = ClientFormSectionNames.PERSONAL;
  SECTIONS = ClientFormSectionNames;

  ngOnInit(): void {
    this.loadFormFromLocalStorage();
  }
  constructor( private userService: UserService, private router: Router, private store: Store) {}
  userForm: FormGroup = this.userService.getUserForm();
  @Input({
    transform: (value: string) => Number(value),
  }) id  = 0;
  /**
   * 
   * @param formPageIndex 
   */
  formPageIndexChanged(formPageIndex: number) {
      this.store.dispatch(SHOW_LOADING_ACTION(true))
      console.log('dispatched', formPageIndex)
      if(formPageIndex<maxImumNumberOfUserFormPages){
        localStorage.setItem('insideFormNav', 'true');
          this.router.navigate(['/add-client', formPageIndex], {
          
          })   
      }
      this.saveFormToLocalStorage()
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
}
