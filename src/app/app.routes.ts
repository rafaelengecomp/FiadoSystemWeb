import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent as CustomerListComponent } from './customers/list/list.component';
import { ListComponent as UserListComponent } from './users/list/list.component';
import { ListComponent as ProductListComponent } from './products/list/list.component';

export const routes: Routes = [

     { path: '', component: AppComponent },
    { path: 'customers', component: CustomerListComponent },
    { path: 'users', component: UserListComponent },
    { path: 'products', component: ProductListComponent },

];


