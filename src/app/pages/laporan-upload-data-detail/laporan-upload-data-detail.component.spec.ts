import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanUploadDataDetailComponent } from './laporan-upload-data-detail.component';

describe('LaporanUploadDataDetailComponent', () => {
  let component: LaporanUploadDataDetailComponent;
  let fixture: ComponentFixture<LaporanUploadDataDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanUploadDataDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanUploadDataDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
