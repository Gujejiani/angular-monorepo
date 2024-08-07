import { ActivatedRouteSnapshot, CanDeactivateFn } from "@angular/router";
import { ClientFormContainerComponent } from "../containers/client-form/client-form-container.component";

export const unsavedChangesGuard: CanDeactivateFn<
  ClientFormContainerComponent
> = (
  component: ClientFormContainerComponent,
  _state: ActivatedRouteSnapshot
) => {
  const insideFormNav = localStorage.getItem("insideFormNav");

  if (component?.userForm?.touched && !insideFormNav) {
    const action = confirm("You have unsaved changes. Do you really want to leave?")
      if(action){
        localStorage.removeItem("userFormData");
      }
    return action;
  }

  localStorage.removeItem("insideFormNav");
  return true;
};
