import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from "../../Core/nav-menu/nav-menu.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterModule, NavMenuComponent]
})
export class HomeComponent {

}



