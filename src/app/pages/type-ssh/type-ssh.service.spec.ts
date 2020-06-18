import { TestBed } from '@angular/core/testing';

import { TypeSshService } from './type-ssh.service';

describe('TypeSshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeSshService = TestBed.get(TypeSshService);
    expect(service).toBeTruthy();
  });
});
