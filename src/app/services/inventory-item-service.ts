import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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

  deleteInventoryItem(id:string){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
