import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanUploadBuktiSurveyComponent } from './laporan-upload-bukti-survey.component';

describe('LaporanUploadBuktiSurveyComponent', () => {
  let component: LaporanUploadBuktiSurveyComponent;
  let fixture: ComponentFixture<LaporanUploadBuktiSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanUploadBuktiSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanUploadBuktiSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
