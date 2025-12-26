import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CustomerService } from '../../../services/customer-service';
import { CustomerDetail } from '../../../models/customer/customer-detail';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-customer-list',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatDividerModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList implements OnInit{
  totalElements = 0;
  pageIndex = 0;
  pageSize = 18;

  customerService = inject(CustomerService);
  customers:CustomerDetail[] = [];

  ngOnInit(): void{
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.customers = data.content;
        this.totalElements = data.totalElements;
        
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  changePage(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getCustomers();
  }
}
