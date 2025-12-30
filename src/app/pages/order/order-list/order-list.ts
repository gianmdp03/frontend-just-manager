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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-order-list',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatDividerModule, DatePipe, RouterLink, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList implements OnInit{
  totalElements = signal<number>(0);
  pageIndex = signal<number>(0);
  pageSize = signal<number>(18);

  orderService = inject(OrderService);
  orders=signal<OrderDet[]>([]);
  dateSearch = signal<boolean>(true);
  startDate = signal<Date | null>(null);
  endDate = signal<Date | null>(null);

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

  searchByDateRange() {
    const start = this.startDate();
    const end = this.endDate();

    if (start && end) {
      const startStr = this.formatDate(start);
      const endStr = this.formatDate(end);

      this.orderService.getOrderBySaleDateBetween(startStr, endStr).subscribe({
        next: (data) => this.orders.set(data.content),
        error: (err) => console.error(err)
      });
    } else {
      alert("Por favor selecciona ambas fechas");
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  changePage(event: PageEvent){
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getOrders();
  }
}
