import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomerRequest } from '../models/customer/customer-request';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly apiUrl = "http://localhost:8080/api/customers";
  http = inject(HttpClient);

  getCustomers(page: number, size: number){
    let params = new HttpParams()
    .set("page", page.toString())
    .set("size", size.toString());

    return this.http.get<any>(this.apiUrl, {params});
  }

  postCustomers(data: CustomerRequest){
    return this.http.post<any>(this.apiUrl, data);
  }

  deleteCustomer(id:string){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
