import { TestBed } from '@angular/core/testing';

import { RecentKansService } from './recent-kans.service';

describe('RecentKansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecentKansService = TestBed.get(RecentKansService);
    expect(service).toBeTruthy();
  });
});
