import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GateFormPage } from './gate-form.page';

describe('GateFormPage', () => {
  let component: GateFormPage;
  let fixture: ComponentFixture<GateFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GateFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
