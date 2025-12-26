import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLayout } from './order-layout';

describe('OrderLayout', () => {
  let component: OrderLayout;
  let fixture: ComponentFixture<OrderLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
