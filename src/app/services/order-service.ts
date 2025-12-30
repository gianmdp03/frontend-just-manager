import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderItemRequest } from '../models/order/order-item-request';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  protected apiUrl = "http://localhost:8080/api/orders";
  http = inject(HttpClient);

  getOrders(page:number, size:number){
    let params = new HttpParams()
    .set("page", page.toString())
    .set("size", size.toString())
    return this.http.get<any>(this.apiUrl, {params});
  }

  getOrder(id: string) {
    const url = `${this.apiUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  getOrderBySaleDateBetween(startDate:string, endDate:string){
    const url = `${this.apiUrl}/${startDate}/${endDate}`;
    return this.http.get<any>(url);
  }

  postOrder(data: OrderItemRequest[], customerId:string){
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.post<any>(url, data);
  }

  deleteOrder(id: string){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
