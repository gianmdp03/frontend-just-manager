import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CustomerService } from '../../../services/customer-service';
import { CustomerDet } from '../../../models/customer/customer-det';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-customer-list',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatDividerModule, RouterLink],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList implements OnInit{
  totalElements = 0;
  pageIndex = 0;
  pageSize = 18;
  cdRef = inject(ChangeDetectorRef);
  customerService = inject(CustomerService);
  customers:CustomerDet[] = [];

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

  deleteCustomer(id:string){
    if(confirm("Eliminar este cliente?")){
      this.customerService.deleteCustomer(id).subscribe({
        next:()=>{
          alert("Cliente eliminado con exito");
          this.customers = this.customers.filter(p => p.id !== id)
        },
        error:(error)=>{
          console.log(error);
        }
      });
    }
  }

  changePage(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getCustomers();
  }
}
