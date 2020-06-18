import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSshFormComponent } from './type-ssh-form.component';

describe('TypeUserFormComponent', () => {
  let component: TypeSshFormComponent;
  let fixture: ComponentFixture<TypeSshFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeSshFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSshFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
