import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer-service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private router = inject(Router);
  customerForm: FormGroup;
  constructor() {
    this.customerForm = this.fb.group({
      fullname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
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
    this.postCustomers();
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
