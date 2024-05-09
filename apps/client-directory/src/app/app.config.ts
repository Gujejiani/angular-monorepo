import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { UsersReducerFn } from './store/state';
import { CoreModule } from '@angular-monorepo/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(),
    provideStore({
      user: UsersReducerFn
    }),
   
    provideStoreDevtools({
      logOnly: !isDevMode(),
    }),
    CoreModule,
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding()
    ),
    provideAnimations(),
  ],
  
};
