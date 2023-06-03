import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoyEditComponent } from './categoy-edit.component';

describe('CategoyEditComponent', () => {
  let component: CategoyEditComponent;
  let fixture: ComponentFixture<CategoyEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoyEditComponent]
    });
    fixture = TestBed.createComponent(CategoyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
