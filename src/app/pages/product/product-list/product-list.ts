import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../../services/product-service';
import { ProductDetail } from '../../../models/product/product-detail';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-list',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatDividerModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit{
  totalElements = 0;
  pageIndex = 0;
  pageSize = 18;

  productService = inject(ProductService);
  products:ProductDetail[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts(this.pageIndex, this.pageSize).subscribe({
      next:(data)=>{
        this.products = data.content;
        this.totalElements = data.totalElements;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  changePage(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProducts();
  }
}
