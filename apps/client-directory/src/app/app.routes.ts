import { ClientFormComponent } from './containers/client-form/client-form.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'add-client',
    //    component: ClientFormComponent
     loadComponent: () => import('./containers/client-form/client-form.component').then(m => m.ClientFormComponent)
   // loadChildren: ()=> import('@angular-monorepo/shared-ui').then(m=>m.SharedUiComponent)
    }
];
