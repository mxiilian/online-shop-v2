import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFrame } from './product-frame';

describe('ProductFrame', () => {
  let component: ProductFrame;
  let fixture: ComponentFixture<ProductFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFrame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFrame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
