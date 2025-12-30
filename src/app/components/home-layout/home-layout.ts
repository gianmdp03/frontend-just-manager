import { Component } from '@angular/core';
import { NavItem } from '../../models/nav-item';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from "../dashboard/dashboard";

@Component({
  selector: 'app-home-layout',
  imports: [Navbar, RouterOutlet, Dashboard],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css',
})
export class HomeLayout {
  menu:NavItem[] = [
    {label: "Clientes", route: "/customers"},
    {label: "Inventario", route: "/inventory-items"},
    {label: "Ubicaciones", route: "/locations"},
    {label: "Ventas", route: "/orders"},
    {label: "Productos", route: "/products"}
  ]
}
