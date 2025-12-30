import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../../services/customer-service';
import { CustomerDet } from '../../../models/customer/customer-det';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-customer-list',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatDividerModule, RouterLink],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList implements OnInit {
  totalElements = signal<number>(0);
  pageIndex = signal<number>(0);
  pageSize = signal<number>(18);
  customerService = inject(CustomerService);
  customers = signal<CustomerDet[]>([]);
  private searchTimer: any;

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers(this.pageIndex(), this.pageSize()).subscribe({
      next: (data) => {
        this.customers.set(data.content);
        this.totalElements.set(data.page.totalElements);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSearch(input: string) {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.searchTimer = setTimeout(() => {
      if (input.trim() === '') {
        this.getCustomers();
      } else {
        this.pageIndex.set(0);
        this.searchCustomers(input);
      }
    }, 300);
  }

  searchCustomers(input: string) {
    this.customerService.searchCustomers(input).subscribe({
      next: (data) => {
        this.customers.set(data.content);
        if(data.page){
          this.totalElements.set(data.page.totalElements);
        }
        else{
          this.totalElements.set(data.content.lenght);
        }
      },
      error: (error) => console.log(error),
    });
  }

  deleteCustomer(id: string) {
    if (confirm('Eliminar este cliente?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          alert('Cliente eliminado con exito');
          this.customers.update((customers) => customers.filter((p) => p.id !== id));
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  changePage(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getCustomers();
  }
}
