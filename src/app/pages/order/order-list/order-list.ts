import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { OrderService } from '../../../services/order-service';
import { OrderDet } from '../../../models/order/order-det';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-order-list',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatDividerModule, DatePipe, RouterLink],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList implements OnInit{
  totalElements = 0;
  pageIndex = 0;
  pageSize = 18;

  orderService = inject(OrderService);
  orders:OrderDet[]=[];

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders(this.pageIndex, this.pageSize).subscribe({
      next:(data)=>{
        this.orders = data.content;
        this.totalElements = data.totalElements;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  deleteOrder(id:string){
    if(confirm("Eliminar esta venta?"))
    {
      this.orderService.deleteOrder(id).subscribe({
        next:()=>{
          alert("Venta eliminada correctamente");
          this.orders = this.orders.filter(p => p.id !== id);
        },
        error:(error)=>{
          alert("Error al eliminar");
        }
      })
    }
  }

  changePage(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getOrders();
  }
}
