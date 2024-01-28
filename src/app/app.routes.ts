import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent as UserComponent } from './users/user.component';
import { NavMenuComponent } from './Core/nav-menu/nav-menu.component';

export const routes: Routes = [

    { path: '', component: AppComponent },
    { path: 'users', component: UserComponent },
    { path: 'nav-menu', component: NavMenuComponent }

];


