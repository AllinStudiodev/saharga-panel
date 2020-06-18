import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSshComponent } from './type-ssh.component';

describe('TypeUserComponent', () => {
  let component: TypeSshComponent;
  let fixture: ComponentFixture<TypeSshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeSshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
