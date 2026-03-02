import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GatesPage } from './gates.page';

describe('GatesPage', () => {
  let component: GatesPage;
  let fixture: ComponentFixture<GatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
