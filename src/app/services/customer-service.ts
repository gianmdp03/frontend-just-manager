import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomerDetail } from '../models/customer/customer-detail';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly apiUrl = "http://localhost:8080/api/customers";
  http = inject(HttpClient);

  getCustomer(){
    return this.http.get<CustomerDetail[]>(this.apiUrl);
  }
}
