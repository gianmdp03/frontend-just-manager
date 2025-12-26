import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CustomerService } from '../../../services/customer-service';
import { CommonModule } from '@angular/common';
import { CustomerDetail } from '../../../models/customer/customer-detail';
@Component({
  selector: 'app-customer-list',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList implements OnInit{
  customerService = inject(CustomerService);
  customers:CustomerDetail[] = [];

  ngOnInit(): void{
    this.getProducts();
  }

  getProducts(){
    this.customerService.getCustomer().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
