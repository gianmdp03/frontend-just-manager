import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm implements OnInit {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  customerId: string | null = null;
  isEditMode: boolean = false;
  customerForm: FormGroup;
  constructor() {
    this.customerForm = this.fb.group({
      fullname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerId = id;
      this.isEditMode = true;
      this.customerService.getCustomer(id).subscribe({
        next: (customer) => {
          this.customerForm.patchValue(customer);
        },
        error: (err) => {
          alert('Error al cargar el cliente');
        },
      });
    }
  }

  get fullname() {
    return this.customerForm.get('fullname');
  }

  get phoneNumber() {
    return this.customerForm.get('phoneNumber');
  }
  onSubmit() {
    this.customerForm.markAllAsTouched();
    if (this.customerForm.invalid) {
      return;
    }
    if (this.isEditMode && this.customerId) {
      this.customerService.patchCustomer(this.customerId, this.customerForm.value).subscribe({
        next: () => {
          alert('Cliente editado correctamente');
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.postCustomers();
    }
  }

  postCustomers() {
    this.customerService.postCustomers(this.customerForm.value).subscribe({
      next: (data) => {
        alert('Cliente guardado correctamente');
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
