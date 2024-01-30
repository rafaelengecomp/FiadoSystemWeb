import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Core/nav-menu/nav-menu.component';
import { UserComponent as UserComponent } from './Features/users/user.component';
import { CustomersComponent as CustomersComponent } from './Features/customers/customers.component';


export const routes: Routes = [

    { path: '', component: AppComponent },
    { path: 'nav-menu', component: NavMenuComponent },
    { path: 'users', component: UserComponent },
    { path: 'customers', component: CustomersComponent },
];


