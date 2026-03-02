import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingSlotsPage } from './parking-slots.page';

describe('ParkingSlotsPage', () => {
  let component: ParkingSlotsPage;
  let fixture: ComponentFixture<ParkingSlotsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSlotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
