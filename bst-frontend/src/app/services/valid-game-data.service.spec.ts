import { TestBed } from '@angular/core/testing';

import { ValidGameDataService } from './valid-game-data.service';

describe('ValidGameDataService', () => {
  let service: ValidGameDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidGameDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
