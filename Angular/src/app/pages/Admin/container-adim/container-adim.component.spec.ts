import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerAdimComponent } from './container-adim.component';

describe('ContainerAdimComponent', () => {
  let component: ContainerAdimComponent;
  let fixture: ComponentFixture<ContainerAdimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerAdimComponent]
    });
    fixture = TestBed.createComponent(ContainerAdimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
