import { Component, input } from '@angular/core';
import { NavItem } from '../../models/nav-item';
import { RouterLink } from "@angular/router";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  items = input.required<NavItem[]>();
}
