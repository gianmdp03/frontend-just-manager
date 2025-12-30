import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../../services/product-service';
import { ProductDet } from '../../../models/product/product-del';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-list',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatDividerModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit{
  totalElements = signal<number>(0);
  pageIndex = signal<number>(0);
  pageSize = signal<number>(18);

  productService = inject(ProductService);
  products = signal<ProductDet[]>([]);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts(this.pageIndex(), this.pageSize()).subscribe({
      next:(data)=>{
        this.products.set(data.content);
        this.totalElements.set(data.page.totalElements);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  onSearch(input: string){
    if(input.trim() === ""){
      this.getProducts();
    }
    else{
      this.searchProducts(input);
    }
  }

  searchProducts(input: string){
    this.productService.searchProduct(input).subscribe({
      next:(data)=>this.products.set(data.content),
      error:(error)=>console.log(error)
    });
  }

  deleteProduct(id:string){
    if(confirm("Eliminar este producto?")){
      this.productService.deleteProduct(id).subscribe({
        next:()=>{
          alert("Producto eliminado con exito");
          this.products.update(products => products.filter(p=>p.id !== id));
        },
        error:(error)=>{
          alert("Error al eliminar el producto");
        }
      });
    }
  }

  changePage(event: PageEvent){
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getProducts();
  }
}
