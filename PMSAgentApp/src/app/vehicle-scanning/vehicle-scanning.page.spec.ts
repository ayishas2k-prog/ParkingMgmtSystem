import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleScanningPage } from './vehicle-scanning.page';

describe('VehicleScanningPage', () => {
  let component: VehicleScanningPage;
  let fixture: ComponentFixture<VehicleScanningPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleScanningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
