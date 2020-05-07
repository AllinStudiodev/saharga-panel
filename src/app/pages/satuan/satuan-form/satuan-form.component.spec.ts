import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatuanFormComponent } from './satuan-form.component';

describe('SatuanFormComponent', () => {
  let component: SatuanFormComponent;
  let fixture: ComponentFixture<SatuanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatuanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatuanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
