import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../../services/customer-service';
import { CustomerDet } from '../../../models/customer/customer-det';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatIconModule, MatButtonModule, RouterLink, DatePipe, MatExpansionModule],
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css',
})
export class CustomerDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private customerService = inject(CustomerService);
  
  customer = signal<CustomerDet | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerService.getCustomer(id).subscribe({
        next: (data) => this.customer.set(data),
        error: (error) => console.error(error)
      });
    }
  }
}