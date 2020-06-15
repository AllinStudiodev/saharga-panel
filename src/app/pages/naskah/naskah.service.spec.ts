import { TestBed } from '@angular/core/testing';

import { NaskahService } from './naskah.service';

describe('NaskahService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NaskahService = TestBed.get(NaskahService);
    expect(service).toBeTruthy();
  });
});
