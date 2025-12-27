import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductRequest } from '../models/product/product-request';

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

  getProduct(id: string) {
    const url = `${this.apiUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  postProduct(data:ProductRequest){
    return this.http.post<any>(this.apiUrl, data);
  }

  patchProduct(id:string, data:Partial<ProductRequest>){
      const url = `${this.apiUrl}/${id}`;
      return this.http.patch<any>(url, data);
  }

  deleteProduct(id:string){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
