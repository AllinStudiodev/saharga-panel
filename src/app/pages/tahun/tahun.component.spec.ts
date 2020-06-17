import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TahunComponent } from './tahun.component';

describe('TahunComponent', () => {
  let component: TahunComponent;
  let fixture: ComponentFixture<TahunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
