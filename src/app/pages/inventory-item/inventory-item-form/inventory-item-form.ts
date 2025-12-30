import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InventoryItemService } from '../../../services/inventory-item-service';
import { ProductService } from '../../../services/product-service';
import { LocationService } from '../../../services/location-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelect, MatOption } from '@angular/material/select';
import { ProductDet } from '../../../models/product/product-del';
import { LocationDet } from '../../../models/location/location-det';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-inventory-item-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatDatepickerModule,
  ],
  templateUrl: './inventory-item-form.html',
  styleUrl: './inventory-item-form.css',
})
export class InventoryItemForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private inventoryItemService = inject(InventoryItemService);
  private productService = inject(ProductService);
  private locationService = inject(LocationService);
  private route = inject(ActivatedRoute);
  isEditMode = signal<boolean>(false);
  inventoryItemId = signal<string>("");
  date = new Date();
  products = signal<ProductDet[]>([]);
  locations = signal<LocationDet[]>([]);
  formGroup: FormGroup;
  constructor() {
    this.formGroup = this.fb.group({
      productId: ['', Validators.required],
      locationId: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(1)]],
      expireDate: ['', Validators.required],
    });
  }

  get productId() {
    return this.formGroup.get('productId');
  }

  get locationId() {
    return this.formGroup.get('locationId');
  }

  get stock() {
    return this.formGroup.get('stock');
  }

  get expireDate() {
    return this.formGroup.get('expireDate');
  }

  ngOnInit(): void {
    this.getProducts();
    this.getLocations();
    const id = this.route.snapshot.paramMap.get("id");
    if(id){
      this.inventoryItemId.set(id);
      this.isEditMode.set(true);
      this.productId?.disable();
      this.expireDate?.disable();
      this.inventoryItemService.getInventoryItem(id).subscribe({
        next:(data)=>{
          const formData = {
            ...data,
            locationId: data.location.id,
            productId: data.product.id
          };
          this.formGroup.patchValue(formData);
        },
        error:(error)=>{
          alert("Error al cargar el ítem de inventario");
        }
      });
    }
  }
  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    if(this.inventoryItemId().trim() === "" && this.isEditMode()){
      this.inventoryItemService.patchInventoryItem(this.inventoryItemId(), this.formGroup.value).subscribe({
        next:()=>{
          alert("Ítem de inventario editado correctamente");
          this.router.navigate(["/inventory-items"]);
        },
        error:(error)=>{
          console.log(error);
          
        }
      });
    }
    else{
          this.postInventoryItem();
    }
  }
  getProducts() {
    this.productService.getProducts(0, 1000).subscribe({
      next: (data) => {
        this.products.set(data.content);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getLocations() {
    this.locationService.getLocations(0, 1000).subscribe({
      next: (data) => {
        this.locations.set(data.content);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  postInventoryItem() {
    this.inventoryItemService.postInventoryItems(this.formGroup.value).subscribe({
      next: () => {
        alert('Ítem de inventario creado correctamente');
        this.router.navigate(['/inventory-items']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
