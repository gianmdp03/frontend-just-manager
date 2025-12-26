import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemDetail } from './inventory-item-detail';

describe('InventoryItemDetail', () => {
  let component: InventoryItemDetail;
  let fixture: ComponentFixture<InventoryItemDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryItemDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryItemDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
