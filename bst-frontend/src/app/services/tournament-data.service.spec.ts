import { TestBed } from '@angular/core/testing';

import { TournamentDataService } from './tournament-data.service';

describe('TournamentDataService', () => {
  let service: TournamentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
