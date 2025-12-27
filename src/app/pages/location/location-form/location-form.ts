import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LocationService } from '../../../services/location-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './location-form.html',
  styleUrl: './location-form.css',
})
export class LocationForm {
  private fb = inject(FormBuilder);
  private locationService = inject(LocationService);
  private router = inject(Router);
  formGroup:FormGroup;

  constructor(){
    this.formGroup = this.fb.group({
      name: ["", Validators.required]
    });
  }

  onSubmit(){
    this.formGroup.markAllAsTouched();
    if(this.formGroup.invalid){
      return;
    }
    this.postLocation();
  }

  postLocation(){
    this.locationService.postLocation(this.formGroup.value).subscribe({
      next:()=>{
        alert("Ubicación creada correctamente");
        this.router.navigate(["/locations"]);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
