import { async, TestBed } from '@angular/core/testing';
import { AuthPagesModule } from './auth.module';

describe('AuthPagesModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AuthPagesModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(AuthPagesModule).toBeDefined();
  });
});
