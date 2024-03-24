import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';

import { MatPaginatorModule } from '@angular/material/paginator';

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(), MatPaginatorModule
  ]
};


