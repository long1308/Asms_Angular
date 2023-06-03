import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoyAddComponent } from './categoy-add.component';

describe('CategoyAddComponent', () => {
  let component: CategoyAddComponent;
  let fixture: ComponentFixture<CategoyAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoyAddComponent]
    });
    fixture = TestBed.createComponent(CategoyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
