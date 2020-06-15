import { TestBed } from '@angular/core/testing';

import { LaporanUploadDataService } from './laporan-upload-data.service';

describe('LaporanUploadDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaporanUploadDataService = TestBed.get(LaporanUploadDataService);
    expect(service).toBeTruthy();
  });
});
