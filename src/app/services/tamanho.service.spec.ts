import { TestBed } from '@angular/core/testing';

import { TamanhoService } from './tamanho.service';

describe('TamanhoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TamanhoService = TestBed.get(TamanhoService);
    expect(service).toBeTruthy();
  });
});
