import { Component } from '@angular/core';
import { NavItem } from '../../models/nav-item';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inventory-item-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './inventory-item-layout.html',
  styleUrl: './inventory-item-layout.css',
})
export class InventoryItemLayout {
  menu:NavItem[] = [
      {label: "Ver inventario", route:"/inventory-items"},
      {label: "Crear ítem de inventario", route: "/inventory-items/create"}
  ]
}
