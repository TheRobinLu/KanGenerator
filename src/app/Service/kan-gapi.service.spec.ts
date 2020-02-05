import { TestBed } from '@angular/core/testing';

import { KanGApiService } from './kan-gapi.service';

describe('KanGApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KanGApiService = TestBed.get(KanGApiService);
    expect(service).toBeTruthy();
  });
});
