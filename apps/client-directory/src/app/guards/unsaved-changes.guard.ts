
import { ActivatedRouteSnapshot, CanDeactivateFn } from '@angular/router';
import { ClientFormContainerComponent } from '../containers/client-form/client-form-container.component';

export const unsavedChangesGuard: CanDeactivateFn<ClientFormContainerComponent> = (component: ClientFormContainerComponent, _state: ActivatedRouteSnapshot) => {


  if (component?.userForm?.touched) {
  
     return confirm('You have unsaved changes. Do you really want to leave?');
  }
 
  return true;
};
