import { TestBed } from '@angular/core/testing';

import { Cost } from './cost';

describe('Cost', () => {
  let service: Cost;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cost);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
