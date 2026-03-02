import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationFormPage } from './location-form.page';

describe('LocationFormPage', () => {
  let component: LocationFormPage;
  let fixture: ComponentFixture<LocationFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
