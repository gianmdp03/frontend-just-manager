import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LocationService } from '../../../services/location-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-location-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './location-form.html',
  styleUrl: './location-form.css',
})
export class LocationForm implements OnInit{
  private fb = inject(FormBuilder);
  private locationService = inject(LocationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  locationId = signal<string>("");
  formGroup: FormGroup;

  constructor() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if(id){
      this.locationId.set(id);
      this.locationService.getLocation(id).subscribe({
        next:(data)=>{
          this.formGroup.patchValue(data);
        },
        error:(error)=>{
          console.log(error);
        }
      });
    }
  }

  get name() {
    return this.formGroup.get('name');
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    if(this.locationId().trim() !== ""){
      this.locationService.patchLocation(this.locationId(), this.formGroup.value).subscribe({
        next:()=>{
          alert("Ubicación editada correctamente");
          this.router.navigate(["/locations"]);
        },
        error:(error)=>{
          console.log(error);
        }
      });
    }
    else{
      this.postLocation();
    }
    
  }

  postLocation() {
    this.locationService.postLocation(this.formGroup.value).subscribe({
      next: () => {
        alert('Ubicación creada correctamente');
        this.router.navigate(['/locations']);
      },
      error: (error) => {
        if (error.status === 409 || error.status === 500) { 
             alert('No se puede eliminar la ubicación (probablemente tiene ítems de inventario asociados).');
          } else {
             alert('Error al eliminar la ubicación.');
          }
      },
    });
  }
}