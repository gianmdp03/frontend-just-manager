import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InventoryItemService } from '../../../services/inventory-item-service';
import { InventoryItemDet } from '../../../models/inventory-item/inventory-item-det';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { ProductDet } from '../../../models/product/product-del';
import { LocationDet } from '../../../models/location/location-det';
import { ProductService } from '../../../services/product-service';
import { LocationService } from '../../../services/location-service';
import { MatSelectModule } from '@angular/material/select';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-inventory-item-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDividerModule,
    RouterLink,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './inventory-item-list.html',
  styleUrl: './inventory-item-list.css',
})
export class InventoryItemList implements OnInit {
  totalElements = signal<number>(0);
  pageIndex = signal<number>(0);
  pageSize = signal<number>(18);
  productService = inject(ProductService);
  locationService = inject(LocationService);
  inventoryItemService = inject(InventoryItemService);
  inventoryItems = signal<InventoryItemDet[]>([]);
  products = signal<ProductDet[]>([]);
  locations = signal<LocationDet[]>([]);
  option = signal<number>(0);
  locationSearch = signal<boolean>(false);
  productSearch = signal<boolean>(false);
  productId = signal<string>('');
  locationId = signal<string>('');

  ngOnInit(): void {
    this.getInventoryItems();
    this.getProducts();
    this.getLocations();
  }

  getInventoryItems() {
    this.inventoryItemService.getInventoryItems(this.getDate(), this.pageIndex(), this.pageSize()).subscribe({
      next: (data) => {
        this.inventoryItems.set(data.content);
        this.totalElements.set(data.totalElements);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleRadio(event: any) {
    this.productId.set('');
    this.locationId.set('');
    if (event.value == 1) {
      this.locationSearch.set(false);
      this.productSearch.set(true);
      this.getInventoryItems();
    } else if (event.value == 2) {
      this.productSearch.set(false);
      this.locationSearch.set(true);
      this.getInventoryItems();
    } else if (event.value == 3) {
      this.locationSearch.set(false);
      this.productSearch.set(false);
      this.getAlmostExpiredInventoryItems("10");

    } else if (event.value == 4) {
      this.locationSearch.set(false);
      this.productSearch.set(false);
      this.getExpiredInventoryItems();
    }
  }

  getProducts() {
    this.productService.getProducts(0, 1000).subscribe({
      next: (data) => this.products.set(data.content),
      error: (error) => console.log(error),
    });
  }

  getLocations() {
    this.locationService.getLocations(0, 1000).subscribe({
      next: (data) => this.locations.set(data.content),
      error: (error) => console.log(error),
    });
  }

  getInventoryItemsByProduct(id: string) {
    this.inventoryItemService.getInventoryItemsByProduct(this.getDate(), id).subscribe({
      next: (data) => this.inventoryItems.set(data.content),
      error: (error) => console.log(error),
    });
  }

  getInventoryItemsByLocation(id: string) {
    this.inventoryItemService.getInventoryItemsByLocation(this.getDate(), id).subscribe({
      next: (data) => this.inventoryItems.set(data.content),
      error: (error) => console.log(error),
    });
  }

  getAlmostExpiredInventoryItems(days:string){
    this.inventoryItemService.getExpiringSoonInventoryItems(this.getDate(), days).subscribe({
      next:(data)=>this.inventoryItems.set(data.content),
      error:(error)=>console.log(error)
    });
  }

  getExpiredInventoryItems() {
    this.inventoryItemService.getExpiredInventoryItems(this.getDate()).subscribe({
      next: (data) => this.inventoryItems.set(data.content),
      error: (error) => console.log(error),
    });
  }

  deleteInventoryItem(id: string) {
    if (confirm('Eliminar este ítem de inventario?')) {
      this.inventoryItemService.deleteInventoryItem(id).subscribe({
        next: () => {
          alert('Ítem de inventario eliminado');
          this.inventoryItems.update((inventoryItems) => inventoryItems.filter((p) => p.id !== id));
        },
        error: (error) => {
          alert('Error al eliminar');
        },
      });
    }
  }

  getDate():string{
    const date = new Date;
    const springDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return springDate;
  }

  changePage(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getInventoryItems();
  }
}
