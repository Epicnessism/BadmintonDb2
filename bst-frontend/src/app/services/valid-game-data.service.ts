import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidGameDataService {

  constructor() { }

  validateGamePointsString(t1PointsString: string, t2PointsString: string) {
    let t1Points = parseInt(t1PointsString);
    let t2Points = parseInt(t2PointsString);
    return this.validateGamePointsNum(t1Points, t2Points);
  }

  //TODO add enum to return different reasons for invalid state
  validateGamePointsNum(t1Points: number, t2Points: number) {
    if(t1Points == t2Points) { return false}

    let maxPoints = t1Points > t2Points ? t1Points : t2Points;
    let winByTwo = t1Points >= t2Points + 2 || t2Points >= t1Points + 2;
    let exactlyTwoIfPastTwentyOne = maxPoints > 21 ? (maxPoints == t1Points + 2 || maxPoints == t2Points + 2) : true;

    return maxPoints && winByTwo && exactlyTwoIfPastTwentyOne
  }
}
