import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  protected apiUrl = "http://localhost:8080/api/products";
  http = inject(HttpClient);

  getProducts(page:number, size:number){
    let params = new HttpParams()
    .set("page", page.toString())
    .set("size", size.toString())
    return this.http.get<any>(this.apiUrl, {params});
  }

  deleteProduct(id:string){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
