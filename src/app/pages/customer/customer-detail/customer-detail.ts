import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order-service';
import { CustomerService } from '../../../services/customer-service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-customer-detail',
  imports: [MatCardModule],
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css',
})
export class CustomerDetail implements OnInit{
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  customer = signal<CustomerDetail|null>(null);
  orderService = inject(OrderService);
  customerService = inject(CustomerService);

  ngOnInit(): void {
    this.getCustomerById();
  }

  getCustomerById(){
    const id = this.route.snapshot.paramMap.get("id");
    if(id){
      this.customerService.getCustomer(id).subscribe({
        next:(data)=>{
          this.customer.set(data);
        },
        error:(error)=>{
          console.log(error);
        }
      });
    }
  }
}
