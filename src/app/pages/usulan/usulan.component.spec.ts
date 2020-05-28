import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsulanComponent } from './usulan.component';

describe('UsulanComponent', () => {
  let component: UsulanComponent;
  let fixture: ComponentFixture<UsulanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsulanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsulanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
