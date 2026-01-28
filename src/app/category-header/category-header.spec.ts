import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHeader } from './category-header';

describe('CategoryHeader', () => {
  let component: CategoryHeader;
  let fixture: ComponentFixture<CategoryHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
