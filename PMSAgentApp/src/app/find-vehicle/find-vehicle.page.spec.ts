import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindVehiclePage } from './find-vehicle.page';

describe('FindVehiclePage', () => {
  let component: FindVehiclePage;
  let fixture: ComponentFixture<FindVehiclePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FindVehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
