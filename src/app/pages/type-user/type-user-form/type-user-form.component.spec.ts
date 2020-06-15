import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeUserFormComponent } from './type-user-form.component';

describe('TypeUserFormComponent', () => {
  let component: TypeUserFormComponent;
  let fixture: ComponentFixture<TypeUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
