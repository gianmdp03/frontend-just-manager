import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InventoryItemService } from '../../../services/inventory-item-service';
import { ProductService } from '../../../services/product-service';
import { LocationService } from '../../../services/location-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelect, MatOption } from '@angular/material/select';
import { ProductDetail } from '../../../models/product/product-detail';
import { LocationDetail } from '../../../models/location/location-detail';
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
  isEditMode:boolean = false;
  inventoryItemId:string | null = null;
  date = new Date();
  products: ProductDetail[] = [];
  locations: LocationDetail[] = [];
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
      this.inventoryItemId = id;
      this.isEditMode = true;
      this.inventoryItemService.getInventoryItem(id).subscribe({
        next:(data)=>{
          this.formGroup.patchValue(data);
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
    if(this.inventoryItemId && this.isEditMode){
      this.inventoryItemService.patchInventoryItem(this.inventoryItemId, this.formGroup.value).subscribe({
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
        this.products = data.content;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getLocations() {
    this.locationService.getLocations(0, 1000).subscribe({
      next: (data) => {
        this.locations = data.content;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  postInventoryItem() {
    this.inventoryItemService.postInventoryItems(this.formGroup.value).subscribe({
      next: (data) => {
        alert('Ítem de inventario creado correctamente');
        this.router.navigate(['/inventory-items']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
