import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationList } from './location-list';

describe('LocationList', () => {
  let component: LocationList;
  let fixture: ComponentFixture<LocationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
