import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsulanFormComponent } from './usulan-form.component';

describe('UsulanFormComponent', () => {
  let component: UsulanFormComponent;
  let fixture: ComponentFixture<UsulanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsulanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsulanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
