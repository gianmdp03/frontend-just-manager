import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order-service';
import { ProductService } from '../../../services/product-service';
import { ProductDet } from '../../../models/product/product-del';
import { OrderItemRequest } from '../../../models/order/order-item-request';
import { CustomerService } from '../../../services/customer-service';
import { CustomerDet } from '../../../models/customer/customer-det';
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
})
export class OrderForm implements OnInit{
  private router = inject(Router);
  private orderService = inject(OrderService);
  private productService = inject(ProductService);
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);
  private customerFb = inject(FormBuilder);
  formGroup:FormGroup;
  customerFormGroup:FormGroup;
  customers = signal<CustomerDet[]>([]);
  products = signal<ProductDet[]>([]);
  orderItemsToBeAdded = signal<OrderItemRequest[]>([]);
  selectedCustomer= signal<string>("");

  constructor(){
    this.formGroup = this.fb.group({
      productId:["", Validators.required],
      amount: ["", [Validators.required, Validators.min(1)]]
    });
    this.customerFormGroup = this.customerFb.group({
      customerId:["", Validators.required]
    });
  }

  get productId() {
    return this.formGroup.get('productId');
  }

  get amount() {
    return this.formGroup.get('amount');
  }

  get customerId() {
    return this.customerFormGroup.get('customerId');
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCustomers();
  }

  getProducts(){
    this.productService.getProducts(0, 1000).subscribe({
      next:(data)=>{
        this.products.set(data.content);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  getCustomers(){
    this.customerService.getCustomers(0, 1000).subscribe({
      next:(data)=>{
        this.customers.set(data.content);
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }
  
  addOrderItemToList(){
    this.formGroup.markAllAsTouched();
    if(this.formGroup.invalid){
      return;
    }
    this.orderItemsToBeAdded.update(orderItems => [...orderItems, this.formGroup.value]);
  }

  postOrderItems(){
    this.orderService.postOrder(this.orderItemsToBeAdded(), this.selectedCustomer()).subscribe({
      next:()=>{
        alert("Venta creada correctamente");
        this.router.navigate(["/orders"]);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  popOrderItem(){
    this.orderItemsToBeAdded.update(orderItems => orderItems.slice(0, -1));
  }

  setSelectedCustomer(){
    this.selectedCustomer.set(this.customerFormGroup.value.customerId);
  }
  isEmpty(){
    if(this.orderItemsToBeAdded().length === 0){
      return true;
    }
    return false;
  }
}
