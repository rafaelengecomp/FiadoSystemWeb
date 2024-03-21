import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Core/nav-menu/nav-menu.component';
import { UserComponent as UserComponent } from './Features/users/user.component';
import { CustomersComponent as CustomersComponent } from './Features/customers/customers.component';
import { ProductsComponent as ProductsComponent } from './Features/products/products.component';
import { SalesRegisterComponent as SalesRegisterComponent } from './Features/sales-register/sales-register.component';

export const routes: Routes = [

    { path: '', component: UserComponent },
    { path: 'nav-menu', component: NavMenuComponent },
    { path: 'users', component: UserComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'sales', component: SalesRegisterComponent },
];