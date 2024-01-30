import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/Features/home/home.component';
import { NavMenuComponent } from './app/Core/nav-menu/nav-menu.component';

bootstrapApplication(HomeComponent, appConfig)
  .catch((err) => console.error(err));


