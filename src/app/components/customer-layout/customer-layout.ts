import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { NavItem } from '../../models/nav-item';

@Component({
  selector: 'app-customer-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './customer-layout.html',
  styleUrl: './customer-layout.css',
})
export class CustomerLayout {
  menu:NavItem[] = [
    {label: "Ver clientes", route:"/customers"},
    {label: "Crear cliente", route: "/customers/create"}
  ]
}
