import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidGameDataService {

  constructor() { }

  validateGamePointsStrings(t1PointsStringArray: string[][], t2PointsStringArray: string[][]) {
    let t1Points: number[] = t1PointsStringArray.map(gameArray => Number(gameArray[1]))
    let t2Points: number[] = t2PointsStringArray.map(gameArray => Number(gameArray[1]))
    for(let i = 0; i < t1Points.length; i++) {
      let currentGame: boolean = this.validateGamePointsNum(t1Points[i], t2Points[i])
      if(!currentGame) { return false}
    }
    return true;
  }

  //TODO add enum to return different reasons for invalid state
  validateGamePointsNum(t1Points: number, t2Points: number): boolean {
    if(t1Points == t2Points) { return false}

    let maxPoints = Math.max(t1Points, t2Points)
    let winByTwo = t1Points >= t2Points + 2 || t2Points >= t1Points + 2
    let exactlyTwoIfPastTwentyOne = maxPoints > 21 ? (maxPoints == t1Points + 2 || maxPoints == t2Points + 2) : true
    let atLeastTwentyOne = maxPoints >= 21

    return winByTwo && exactlyTwoIfPastTwentyOne && atLeastTwentyOne
  }
}
