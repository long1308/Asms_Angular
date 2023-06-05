import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuardComponent } from './admin-guard.component';

describe('AdminGuardComponent', () => {
  let component: AdminGuardComponent;
  let fixture: ComponentFixture<AdminGuardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGuardComponent]
    });
    fixture = TestBed.createComponent(AdminGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
