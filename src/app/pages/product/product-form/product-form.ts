import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  formGroup: FormGroup;

  constructor() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  get name() {
    return this.formGroup.get('name');
  }

  get imageUrl() {
    return this.formGroup.get('imageUrl');
  }
  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    this.postProduct();
  }

  postProduct() {
    this.productService.postProduct(this.formGroup.value).subscribe({
      next: () => {
        alert('Producto creado con exito');
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
