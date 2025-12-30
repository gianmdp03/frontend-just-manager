import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InventoryItemRequest } from '../models/inventory-item/inventory-item-request';

@Injectable({
  providedIn: 'root',
})
export class InventoryItemService {
  protected apiUrl = "http://localhost:8080/api/inventory-items";
  http = inject(HttpClient);

  getInventoryItems(date:string, page:number, size:number){
    const url = `${this.apiUrl}/${date}`;
    let params = new HttpParams()
    .set("page", page.toString())
    .set("size", size.toString())
    return this.http.get<any>(url, {params});
  }

  getInventoryItem(id: string) {
    const url = `${this.apiUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  getExpiringSoonInventoryItems(date:string, days:string){
    const url = `${this.apiUrl}/${date}/almost/${days}`;
    return this.http.get<any>(url);
  }

  getExpiredInventoryItems(date:string){
    const url = `${this.apiUrl}/${date}/expired`;
    return this.http.get<any>(url);
  }

  getInventoryItemsByProduct(date:string, id:string){
    const url = `${this.apiUrl}/${date}/product/${id}`;
    return this.http.get<any>(url);
  }

  getInventoryItemsByLocation(date:string, id:string){
    const url = `${this.apiUrl}/${date}/location/${id}`;
    return this.http.get<any>(url);
  }

  postInventoryItems(inventoryItem: InventoryItemRequest){
    return this.http.post<any>(this.apiUrl, inventoryItem);
  }

  patchInventoryItem(id:string, data:Partial<InventoryItemRequest>){
      const url = `${this.apiUrl}/${id}`;
      return this.http.patch<any>(url, data);
  }

  deleteInventoryItem(id:string){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
