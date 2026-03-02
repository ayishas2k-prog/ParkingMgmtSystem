import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CostPage } from './cost.page';

describe('CostPage', () => {
  let component: CostPage;
  let fixture: ComponentFixture<CostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
