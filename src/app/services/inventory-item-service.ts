import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InventoryItemRequest } from '../models/inventory-item/inventory-item-request';

@Injectable({
  providedIn: 'root',
})
export class InventoryItemService {
  protected apiUrl = "http://localhost:8080/api/inventory-items";
  http = inject(HttpClient);

  getInventoryItems(page:number, size:number){
    let params = new HttpParams()
    .set("page", page.toString())
    .set("size", size.toString())
    return this.http.get<any>(this.apiUrl, {params});
  }

  getInventoryItem(id: string) {
    const url = `${this.apiUrl}/id/${id}`;
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
