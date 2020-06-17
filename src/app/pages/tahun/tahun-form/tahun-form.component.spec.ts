import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TahunFormComponent } from './tahun-form.component';

describe('TahunFormComponent', () => {
  let component: TahunFormComponent;
  let fixture: ComponentFixture<TahunFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahunFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahunFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
