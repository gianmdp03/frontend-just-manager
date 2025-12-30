import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../services/product-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit{
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  formGroup: FormGroup;
  productId = signal<string>("");

  constructor() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
   const id = this.route.snapshot.paramMap.get("id");
   if(id){
    this.productId.set(id);
    this.productService.getProduct(id).subscribe({
      next:(data)=>{
        this.formGroup.patchValue(data);
      },
      error:(error)=>{
        console.log(error);
        
      }
    });
   } 
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
    if(this.productId().trim() !== ""){
      this.productService.patchProduct(this.productId(), this.formGroup.value).subscribe({
        next:()=>{
          alert("Producto editado correctamente");
          this.router.navigate(["/products"]);
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
    else{
      this.postProduct();
    }
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
