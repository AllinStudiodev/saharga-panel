import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaskahFormComponent } from './naskah-form.component';

describe('NaskahFormComponent', () => {
  let component: NaskahFormComponent;
  let fixture: ComponentFixture<NaskahFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaskahFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaskahFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
