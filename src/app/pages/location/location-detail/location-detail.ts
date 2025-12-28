import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocationService } from '../../../services/location-service';
import { LocationDet } from '../../../models/location/location-det';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatIconModule, MatButtonModule, RouterLink, DatePipe],
  templateUrl: './location-detail.html',
  styleUrl: './location-detail.css',
})
export class LocationDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private locationService = inject(LocationService);

  location = signal<LocationDet | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.locationService.getLocation(id).subscribe({
        next: (data) => this.location.set(data),
        error: (error) => console.error(error)
      });
    }
  }
}