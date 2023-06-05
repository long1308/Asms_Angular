import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGuardNotLoggedComponent } from './auth-guard-not-logged.component';

describe('AuthGuardNotLoggedComponent', () => {
  let component: AuthGuardNotLoggedComponent;
  let fixture: ComponentFixture<AuthGuardNotLoggedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthGuardNotLoggedComponent]
    });
    fixture = TestBed.createComponent(AuthGuardNotLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
