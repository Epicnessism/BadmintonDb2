import { TestBed } from '@angular/core/testing';

import { UserDataServiceService } from './user-data-service.service';

describe('UserDataServiceService', () => {
  let service: UserDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
