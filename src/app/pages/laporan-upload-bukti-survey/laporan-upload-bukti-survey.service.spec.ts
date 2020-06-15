import { TestBed } from '@angular/core/testing';

import { LaporanUploadBuktiSurveyService } from './laporan-upload-bukti-survey.service';

describe('LaporanUploadBuktiSurveyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaporanUploadBuktiSurveyService = TestBed.get(LaporanUploadBuktiSurveyService);
    expect(service).toBeTruthy();
  });
});
