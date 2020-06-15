import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuktiSurveyFormComponent } from './bukti-survey-form.component';

describe('BuktiSurveyFormComponent', () => {
  let component: BuktiSurveyFormComponent;
  let fixture: ComponentFixture<BuktiSurveyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuktiSurveyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuktiSurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
