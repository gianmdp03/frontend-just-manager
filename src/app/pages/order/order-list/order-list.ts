import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { OrderService } from '../../../services/order-service';
import { OrderDet } from '../../../models/order/order-det';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-order-list',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatDividerModule, DatePipe, RouterLink, MatExpansionModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList implements OnInit{
  totalElements = signal<number>(0);
  pageIndex = signal<number>(0);
  pageSize = signal<number>(18);

  orderService = inject(OrderService);
  orders=signal<OrderDet[]>([]);

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders(this.pageIndex(), this.pageSize()).subscribe({
      next:(data)=>{
        this.orders.set(data.content);
        this.totalElements.set(data.totalElements);
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
          this.orders.update(orders => orders.filter(p => p.id !== id));
        },
        error:(error)=>{
          alert("Error al eliminar");
        }
      });
    }
  }

  changePage(event: PageEvent){
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getOrders();
  }
}
