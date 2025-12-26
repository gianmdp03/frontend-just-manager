import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LocationService } from '../../../services/location-service';
import { LocationDetail } from '../../../models/location/location-detail';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-location-list',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatDividerModule],
  templateUrl: './location-list.html',
  styleUrl: './location-list.css',
})
export class LocationList implements OnInit{
  totalElements = 0;
  pageIndex = 0;
  pageSize = 18;

  locationService = inject(LocationService);
  locations:LocationDetail[]=[];

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(){
    return this.locationService.getLocations(this.pageIndex, this.pageSize).subscribe({
      next:(data)=>{
        this.locations = data.content;
        this.totalElements = data.totalElements;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  deleteLocation(id:string){
    if(confirm("Eliminar esta ubicación?")){
      this.locationService.deleteLocation(id).subscribe({
        next: ()=> {
          alert("Ubicación eliminada correctamente");
          this.locations = this.locations.filter(p => p.id !== id);
        }
      })
    }
  }

  changePage(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getLocations();
  }
}
