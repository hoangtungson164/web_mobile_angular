import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token.service';

describe('TokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenStorageService = TestBed.get(TokenStorageService);
    expect(service).toBeTruthy();
  });
});
