import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { InventoryItemService } from '../../../services/inventory-item-service';
import { InventoryItemDet } from '../../../models/inventory-item/inventory-item-det';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-inventory-item-list',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatDividerModule, RouterLink],
  templateUrl: './inventory-item-list.html',
  styleUrl: './inventory-item-list.css',
})
export class InventoryItemList implements OnInit{
  totalElements = 0;
  pageIndex = 0;
  pageSize = 18;

  inventoryItemService = inject(InventoryItemService);
  inventoryItems: InventoryItemDet[] = [];

  ngOnInit(): void {
    this.getInventoryItems();
  }

  getInventoryItems(){
    this.inventoryItemService.getInventoryItems(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.inventoryItems = data.content;
        this.totalElements = data.totalElements;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteInventoryItem(id:string){
    if(confirm("Eliminar este ítem de inventario?")){
      this.inventoryItemService.deleteInventoryItem(id).subscribe({
        next:()=>{
          alert("Ítem de inventario eliminado");
          this.inventoryItems = this.inventoryItems.filter(p => p.id !== id);
        },
        error:(error)=>{
          alert("Error al eliminar");
          
        }
      })
    }
  }

  changePage(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getInventoryItems();
  }
}
