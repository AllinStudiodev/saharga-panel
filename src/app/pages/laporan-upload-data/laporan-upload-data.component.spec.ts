import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanUploadDataComponent } from './laporan-upload-data.component';

describe('LaporanUploadDataComponent', () => {
  let component: LaporanUploadDataComponent;
  let fixture: ComponentFixture<LaporanUploadDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanUploadDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanUploadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
