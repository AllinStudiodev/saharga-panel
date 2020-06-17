import { TestBed } from '@angular/core/testing';

import { TahunService } from './tahun.service';

describe('TahunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TahunService = TestBed.get(TahunService);
    expect(service).toBeTruthy();
  });
});
