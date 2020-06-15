import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaskahComponent } from './naskah.component';

describe('NaskahComponent', () => {
  let component: NaskahComponent;
  let fixture: ComponentFixture<NaskahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaskahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaskahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
