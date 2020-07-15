import { TestBed } from '@angular/core/testing';

import { CorService } from './cor.service';

describe('CorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorService = TestBed.get(CorService);
    expect(service).toBeTruthy();
  });
});
