import { TestBed } from '@angular/core/testing';

import { UsulanService } from './usulan.service';

describe('UsulanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsulanService = TestBed.get(UsulanService);
    expect(service).toBeTruthy();
  });
});
