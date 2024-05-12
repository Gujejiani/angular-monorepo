import { Route } from '@angular/router';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { formGuard } from './guards/form.guard';
import { userDetailResolver } from './resolver/detail.resolver';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./containers/clients-container/clients-container.component').then(c => c.ClientsContainerComponent),
    },
    {
        path: 'add-client/:id',
        canDeactivate: [unsavedChangesGuard],
        canActivate: [formGuard],
        loadComponent: () => import('./pages/form-page/form-page.component').then(c => c.FormPageComponent),
    
      
    },
    {
        
        path: 'create-account/:id',
        loadComponent: () => import('./pages/account-form/account-from-page.component').then(c => c.AccountPageComponent),    

    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/detail/detail-page.component').then(c => c.DetailPageComponent),
        resolve: {user: userDetailResolver},
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    }
];
