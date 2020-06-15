import { TestBed } from '@angular/core/testing';

import { LaporanUploadDataDetailService } from './laporan-upload-data-detail.service';

describe('LaporanUploadDataDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaporanUploadDataDetailService = TestBed.get(LaporanUploadDataDetailService);
    expect(service).toBeTruthy();
  });
});
