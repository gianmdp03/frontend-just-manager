import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemLayout } from './inventory-item-layout';

describe('InventoryItemLayout', () => {
  let component: InventoryItemLayout;
  let fixture: ComponentFixture<InventoryItemLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryItemLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryItemLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
