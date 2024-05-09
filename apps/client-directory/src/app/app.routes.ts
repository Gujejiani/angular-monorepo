import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'add-client/:id',
     loadComponent: () => import('./containers/client-form/client-form-container.component').then(m => m.ClientFormComponent)

    }
];
