import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemList } from './inventory-item-list';

describe('InventoryItemList', () => {
  let component: InventoryItemList;
  let fixture: ComponentFixture<InventoryItemList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryItemList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryItemList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
