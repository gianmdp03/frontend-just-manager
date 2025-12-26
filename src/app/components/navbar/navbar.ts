import { Component, input, InputSignal } from '@angular/core';
import { NavItem } from '../../models/nav-item';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  items = input.required<NavItem[]>();
}
