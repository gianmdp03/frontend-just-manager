import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { ProductService } from '../../services/product-service';
import { InventoryItemService } from '../../services/inventory-item-service';
import { CustomerService } from '../../services/customer-service';
import { OrderService } from '../../services/order-service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  private productService = inject(ProductService);
  private inventoryItemService = inject(InventoryItemService);
  private customerService = inject(CustomerService);
  private orderService = inject(OrderService);
  private router= inject(Router);
  productNumber = signal<number>(0);
  inventoryItemNumber = signal<number>(0);
  customerNumber = signal<number>(0);
  orderNumber = signal<number>(0);

  ngOnInit(): void {
    this.getProducts();
    this.getInventoryItems();
    this.getCustomers();
    this.getOrders();
  }

  getProducts(){
    this.productService.getProducts(0, 1000).subscribe({
      next:(data)=> this.productNumber.set(data.page.totalElements)
      ,
      error:(error)=>console.log(error)
    });
  }

  getInventoryItems(){
    this.inventoryItemService.getInventoryItems(this.getDate(), 0, 1000).subscribe({
      next:(data)=> this.inventoryItemNumber.set(data.page.totalElements),
      error:(error)=>console.log(error)
    });
  }

  getCustomers(){
    this.customerService.getCustomers(0, 1000).subscribe({
      next:(data)=> this.customerNumber.set(data.page.totalElements),
      error:(error)=>console.log(error)
    });
  }

  getOrders(){
    this.orderService.getOrders(0, 1000).subscribe({
      next:(data)=> this.orderNumber.set(data.page.totalElements),
      error:(error)=>console.log(error)
    });
  }

  getDate():string{
    const date = new Date;
    const springDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return springDate;
  }
  navigate(number:number){
    switch(number){
      case 1:
        this.router.navigate(["/products"]);
        break;
      case 2:
        this.router.navigate(["/inventory-items"]);
        break;
      case 3:
        this.router.navigate(["/customers"]);
        break;
      case 4:
        this.router.navigate(["/orders"]);
        break;
    }
  }
}
