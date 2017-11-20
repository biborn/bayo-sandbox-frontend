import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthLoginGuard } from './auth-login.guard';

describe('AuthLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [AuthLoginGuard]
    });
  });

  it('should ...', inject([AuthLoginGuard], (guard: AuthLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
