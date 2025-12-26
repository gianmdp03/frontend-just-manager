import { Component } from '@angular/core';
import { NavItem } from '../../models/nav-item';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-location-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './location-layout.html',
  styleUrl: './location-layout.css',
})
export class LocationLayout {
  menu:NavItem[] = [
      {label: "Ver ubicaciones", route:"/locations"},
      {label: "Crear ubicación", route: "/locations/create"}
  ]
}
