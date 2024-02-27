import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from "../../Core/nav-menu/nav-menu.component";
import { LeftNavMenuComponent } from "../../Core/left-nav-menu/left-nav-menu.component";
import { SalesRegisterComponent as SalesRegisterComponent } from '../../Features/sales-register/sales-register.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterModule, NavMenuComponent, LeftNavMenuComponent, SalesRegisterComponent]
})
export class HomeComponent {

 

}



