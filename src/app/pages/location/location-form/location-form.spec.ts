import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationForm } from './location-form';

describe('LocationForm', () => {
  let component: LocationForm;
  let fixture: ComponentFixture<LocationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
