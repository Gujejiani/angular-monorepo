import { maxImumNumberOfUserFormPages } from '@angular-monorepo/shared';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const formGuard: CanActivateFn = (route, _state) => {
 
  const router = inject(Router);
  const id = Number(route.params['id']);
 
  

  if( id >= maxImumNumberOfUserFormPages || id !==0 && !id) {
    console.log('handled by form guard')
    router.navigate(['/add-client/0'])
    return false;
  }
 
  return true;
};
