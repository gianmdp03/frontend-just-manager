import { Component } from '@angular/core';
import { NavItem } from '../../models/nav-item';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-layout',
  imports: [Navbar, RouterLink],
  templateUrl: './order-layout.html',
  styleUrl: './order-layout.css',
})
export class OrderLayout {
  menu:NavItem[] = [
      {label: "Ver ventas", route:"/orders"},
      {label: "Crear venta", route: "/orders/create"}
  ]
}
