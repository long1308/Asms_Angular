import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOfCategoriesComponent } from './products-of-categories.component';

describe('ProductsOfCategoriesComponent', () => {
  let component: ProductsOfCategoriesComponent;
  let fixture: ComponentFixture<ProductsOfCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsOfCategoriesComponent]
    });
    fixture = TestBed.createComponent(ProductsOfCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
