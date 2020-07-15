import { TestBed } from '@angular/core/testing';

import { RoupaService } from './roupa.service';

describe('RoupaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoupaService = TestBed.get(RoupaService);
    expect(service).toBeTruthy();
  });
});
