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

  const testCases = [
    {t1Points: 21,t2Points: 11, expected: true},
    {t1Points: 21,t2Points: 21, expected: false},
    {t1Points: 21,t2Points: 19, expected: true},
    {t1Points: 21,t2Points: 11123, expected: false},
    {t1Points: 19,t2Points: 1, expected: false},
    {t1Points: -5,t2Points: 0, expected: false},
  ]

  testCases.forEach((testCase) => {
    it(`should evaluate game to be ${testCase.expected} with ${testCase.t1Points}:${testCase.t2Points}`, () => {
      let result: boolean = service.validateGamePointsNum(testCase.t1Points,testCase.t2Points);
      expect(result).toBe(testCase.expected)
    } )
  })


});
