import { Component } from '@angular/core';
import { NavItem } from '../../models/nav-item';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './product-layout.html',
  styleUrl: './product-layout.css',
})
export class ProductLayout {
  menu:NavItem[] = [
      {label: "Ver productos", route:"/products"},
      {label: "Crear producto", route: "/products/create"}
  ]
}
