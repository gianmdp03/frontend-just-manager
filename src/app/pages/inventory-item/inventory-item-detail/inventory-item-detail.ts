import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InventoryItemService } from '../../../services/inventory-item-service';
import { InventoryItemDet } from '../../../models/inventory-item/inventory-item-det';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inventory-item-detail',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatIconModule, MatButtonModule, RouterLink, DatePipe],
  templateUrl: './inventory-item-detail.html',
  styleUrl: './inventory-item-detail.css',
})
export class InventoryItemDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private inventoryService = inject(InventoryItemService);

  inventoryItem = signal<InventoryItemDet | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.inventoryService.getInventoryItem(id).subscribe({
        next: (data) => this.inventoryItem.set(data),
        error: (error) => console.error(error)
      });
    }
  }
}