import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemForm } from './inventory-item-form';

describe('InventoryItemForm', () => {
  let component: InventoryItemForm;
  let fixture: ComponentFixture<InventoryItemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryItemForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryItemForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
