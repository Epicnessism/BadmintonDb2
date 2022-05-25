import { ChangeDetectionStrategy, Component, OnInit, Inject, Input } from '@angular/core';
import { Set } from 'src/app/interfaces/set.model';
import { EventMetaData } from 'src/app/interfaces/event-meta-data.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';
import { BracketData } from 'src/app/interfaces/bracket-data.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ValidGameDataService } from 'src/app/services/valid-game-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bracket-view',
  changeDetection: ChangeDetectionStrategy.Default, //TODO FIX THIS SO WE CAN UPDATE OUR DATA
  templateUrl: './bracket-view.component.html',
  styleUrls: ['./bracket-view.component.css']
})
export class BracketViewComponent implements OnInit {

  @Input() inputEventMetaData: any = '';

  bracketMetaData: EventMetaData | undefined
  bracket: any[][] = []
  bracketData: Set[] = []

  depth1: any[] = []

  id: string[] = ['one', 'two', 'three', 'four']

  constructor(
    private tournamentDataService: TournamentDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.inputEventMetaData);

    this.getData()
  }

  openDialog(setData: Set) {
    console.log(setData);
    let wrapData = {setData, bracketMetaData: this.inputEventMetaData}
    const dialogRef = this.dialog.open(SetDetailsDiaglogComponent, {data: wrapData });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async getData() {
    await this.getBracketData(this.inputEventMetaData.bracket_id);
  }

  async getBracketData(bracketId: string) {
    this.tournamentDataService.getBracketData(bracketId).subscribe(result => {
      console.log(result);
      this.bracketData = result;
      console.log(this.bracketData);
      console.log(this.bracketData[0]);
      console.log(this.bracketData.length);
      this.splitBracketData();
    });
  }

  splitBracketData(): void {
    console.log(`isBracketMetaData not null? ${this.inputEventMetaData != null} `);

    if(this.inputEventMetaData != null) {
      let bracketsize = this.inputEventMetaData.bracket_size;
      let depthOfBracket = Math.log2(bracketsize);

      for(let layer = 1; layer <= depthOfBracket; layer++) {
        let thisLayer = this.depth1 = this.bracketData.splice(0, bracketsize / Math.pow(2, layer));
        console.log('this layer depth is: %d', layer);
        console.log('this layer is: %s', thisLayer);
        this.bracket.push(thisLayer)
      }

    }

    console.log(this.bracket);
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class SetDetailsDiaglogComponent {

  constructor(
    public dialogRef: MatDialogRef<SetDetailsDiaglogComponent>,
    private tournamentDataService: TournamentDataService,
    @Inject(MAT_DIALOG_DATA) public wrapData: any, //TODO look into how to make this not one object...
    private validGameDataService: ValidGameDataService
  ) {}

  updateSet(): void {
    // let isValidPoints = this.validGameDataService.validateGamePointsStrings(this.wrapData.setData.team_1_points, this.wrapData.setData.team_2_points)
    let isValidPoints = true; //TODO do something about this at some point? revamp loose validitiy
    console.log(`the validity of the set points is: ${isValidPoints}`);

    // let isValidNumberOfGames = false //todo add this, requires reading metadata
    // let winningTeam = this.automaticallyDetermineWinningTeam();

    if(isValidPoints) {
      console.log(this.wrapData.setData);
      this.tournamentDataService.postUpdateSetData(this.wrapData.setData)
        .subscribe( result => {
          console.log(result);
          if(result != null) {
            this.onNoClick()
          } else {
            console.log("Error updating set!");

          }
        })
    }
  }



  /**
   * a completed game for a tournament has:
   * the right number of won games by a team relative to the best_of value of the event
   * valid game input
   * */

  completedSet(): void {
    //TODO do logic for setting completed value and winning team value before calling updateSet
    // this.wrapData.setData.completed = true;
    //TODO replace this with a manaul button override for special cases
    // if(manualWinOverride) {
    // }
    // this.wrapData.setData.winning_team = 1

    this.wrapData.setData.winning_team = null

    // let isValidCompleteNumberOfGames = this.automaticallyDetermineWinningTeam()

    this.updateSet()
  }

  addGame(): void {
    if(this.wrapData.setData.team_1_points == null) {
      this.wrapData.setData.team_1_points = [[1]]
      this.wrapData.setData.team_2_points = [[1]]
    } else if(this.wrapData.setData.team_1_points.length > this.wrapData.bracketMetaData.best_of - 1) {
      console.error("Number of games greater than allowed!");
    } else {
      this.wrapData.setData.team_1_points.push([this.wrapData.setData.team_1_points.length + 1])
      this.wrapData.setData.team_2_points.push([this.wrapData.setData.team_2_points.length + 1])
    }
  }

  // automaticallyDetermineWinningTeam(): number {
  //   //get for each set, who won
  //   return 1
  // }

  validateInput(setData: Set, gameNumber: number, event: any): boolean {
    console.log(event)
    return true
  }

  onNoClick(): void {
    //TODO VALIDATE INPUT BEFORE CLOSING.
    this.dialogRef.close()
  }
}

// un-used code that works for getting each change event of a form input
// (ngModelChange)="validateInput(setData, ind, $event)"
