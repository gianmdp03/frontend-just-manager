import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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
}
