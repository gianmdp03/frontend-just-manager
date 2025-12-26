import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationLayout } from './location-layout';

describe('LocationLayout', () => {
  let component: LocationLayout;
  let fixture: ComponentFixture<LocationLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
