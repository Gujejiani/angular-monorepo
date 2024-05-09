import { Route } from '@angular/router';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { formGuard } from './guards/form.guard';

export const appRoutes: Route[] = [
    {
        path: 'add-client/:id',
     loadComponent: () => import('./containers/client-form/client-form-container.component').then(m => m.ClientFormContainerComponent),
        canDeactivate: [unsavedChangesGuard],
        canActivate: [formGuard],
    }
];
