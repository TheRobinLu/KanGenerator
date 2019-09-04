import { TestBed } from '@angular/core/testing';

import { KanDetailService } from './kan-detail.service';

describe('KanDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KanDetailService = TestBed.get(KanDetailService);
    expect(service).toBeTruthy();
  });
});
