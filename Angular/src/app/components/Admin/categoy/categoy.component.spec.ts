import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoyComponent } from './categoy.component';

describe('CategoyComponent', () => {
  let component: CategoyComponent;
  let fixture: ComponentFixture<CategoyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoyComponent]
    });
    fixture = TestBed.createComponent(CategoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
