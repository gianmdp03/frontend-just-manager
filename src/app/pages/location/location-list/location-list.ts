import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LocationService } from '../../../services/location-service';
import { LocationDet } from '../../../models/location/location-det';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-location-list',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatDividerModule, RouterLink],
  templateUrl: './location-list.html',
  styleUrl: './location-list.css',
})
export class LocationList implements OnInit {
  totalElements = signal<number>(0);
  pageIndex = signal<number>(0);
  pageSize = signal<number>(18);

  locationService = inject(LocationService);
  locations = signal<LocationDet[]>([]);
  private searchTimer: any;

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    return this.locationService.getLocations(this.pageIndex(), this.pageSize()).subscribe({
      next: (data) => {
        this.locations.set(data.content);
        this.totalElements.set(data.page.totalElements);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSearch(input: string) {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.searchTimer = setTimeout(() => {
      if (input.trim() === '') {
        this.getLocations();
      } else {
        this.searchLocation(input);
      }
    }, 300);
  }

  searchLocation(input: string) {
    this.locationService.searchLocation(input).subscribe({
      next: (data) => this.locations.set(data.content),
      error: (error) => console.log(error),
    });
  }

  deleteLocation(id: string) {
    if (confirm('Eliminar esta ubicación?')) {
      this.locationService.deleteLocation(id).subscribe({
        next: () => {
          alert('Ubicación eliminada correctamente');
          this.locations.update((locations) => locations.filter((p) => p.id !== id));
        },
        error: (error) => {
          alert('Error al eliminar');
        },
      });
    }
  }

  changePage(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getLocations();
  }
}
