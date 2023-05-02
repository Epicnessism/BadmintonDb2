import { ChangeDetectionStrategy, Component, OnInit, Inject, Input, SimpleChanges } from '@angular/core';
import { Set } from 'src/app/interfaces/set.model';
import { EventBracketMetaData } from 'src/app/interfaces/event-brackets-meta-data.model';
import { TournamentDataService } from 'src/app/services/tournaments/tournament-data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ValidGameDataService } from 'src/app/services/valid-game-data.service';

@Component({
  selector: 'app-bracket-view',
  changeDetection: ChangeDetectionStrategy.Default, //TODO FIX THIS SO WE CAN UPDATE OUR DATA
  templateUrl: './bracket-view.component.html',
  styleUrls: ['./bracket-view.component.css']
})
export class BracketViewComponent implements OnInit {

  @Input() inputEventMetaData!: EventBracketMetaData
  @Input() isTournamentAdmin!: boolean
  @Input() eventInProgress!: boolean

  bracketMetaData: EventBracketMetaData | undefined
  bracket: any[][] = []

  bracketData: Set[] = []

  depth1: any[] = []

  constructor(
    private tournamentDataService: TournamentDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.inputEventMetaData);

    this.getData()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.eventInProgress = changes['eventInProgress'].currentValue //* attempting to set the value of eventInProgress if the value changes
  }

  openDialog(setData: Set): void {
    console.log(setData);
    console.log(this.eventInProgress, " | and | ", this.isTournamentAdmin);

    if(!this.eventInProgress && !this.isTournamentAdmin) { //* do check to see if tournament is inprogress or an admin before opening set editing dialog
      console.log("Event not in progress and user is not a tournament admin");
      return
    }

    let wrapData = {setData, bracketMetaData: this.inputEventMetaData}
    const dialogRef = this.dialog.open(SetDetailsDiaglogComponent, {data: wrapData });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result === "refreshBracket") {
        this.tournamentDataService.pullEventMetaData(this.inputEventMetaData.event_id)
        this.tournamentDataService.pullBracketsMetaData(this.inputEventMetaData.event_id)
      }
    });
  }

  async getData() {
    await this.getBracketData(this.inputEventMetaData.bracket_id);
  }

  async getBracketData(bracketId: string) {
    this.tournamentDataService.getBracketData(bracketId).subscribe(result => {
      console.log(result);
      this.bracketData = []
      this.bracket = []
      this.bracketData = result
      console.log(this.bracketData)
      this.generateBracketSkeleton()
      // this.splitBracketData()
      this.mapBracketDataToSkeleton()
    });
  }

  generateBracketSkeleton(): void {
    console.log(`attempting to generate full skeleton bracket for bracketLevel: ${this.inputEventMetaData.bracket_level} with bracketsize: ${this.inputEventMetaData.bracket_size}`);
    let bracketSize = this.inputEventMetaData.bracket_size;
    let depthOfBracket = Math.log2(bracketSize);

    let startingGameNumber = 1
    for(let layer = 1; layer <= depthOfBracket; layer++) {
      let numGamesInThisLayer = bracketSize / Math.pow(2, layer)

      let thisLayer = Array.from({ length: numGamesInThisLayer }).map((u, i) => {return {"eventGameNumber" : startingGameNumber++}})
      this.bracket.push(thisLayer)
    }
    console.log(this.bracket);

  }

  mapBracketDataToSkeleton(): void {
    console.log(this.bracket);

    for(let depth of this.bracket) {
      for(let tile = 0; tile < depth.length; tile++) {
        let bracketDataIndex = this.bracketData.findIndex(game => game.eventGameNumber == depth[tile].eventGameNumber)
        if(bracketDataIndex != -1) {
          let setData = this.bracketData.splice(bracketDataIndex, 1)
          depth[tile] = setData[0]
        }

      }
    }
  }

  splitBracketData(): void {
    console.log(`isBracketMetaData not null? ${this.inputEventMetaData != null} `);

    if(this.inputEventMetaData != null) {
      let bracketSize = this.inputEventMetaData.bracket_size;
      let depthOfBracket = Math.log2(bracketSize);

      for(let layer = 1; layer <= depthOfBracket; layer++) {
        let thisLayer: any = this.bracketData.splice(0, bracketSize / Math.pow(2, layer));

        if(thisLayer.length > 0) {
          console.log(`this layer length: ${thisLayer.length}`);
          console.log(thisLayer);


          for(let game of thisLayer) {
            let gameIndex = this.bracket[layer-1].findIndex( tile => tile.eventGameNumber == game.eventGameNumber);
            console.log(`game index found is: ${gameIndex}`);

            this.bracket[layer-1][gameIndex] = game
          }
          console.log(this.bracket);

        }

        console.log('this layer depth is: %d', layer);
        console.log('this layer is: %s', thisLayer);
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
            this.closeAndRefresh()
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

  closeAndRefresh(): void {
    //TODO VALIDATE INPUT BEFORE CLOSING.
    this.dialogRef.close("refreshBracket")
  }

  //* for when you just want to close the dialog and not refresh
  closeDialog(): void {
    this.dialogRef.close()
  }
}

// un-used code that works for getting each change event of a form input
// (ngModelChange)="validateInput(setData, ind, $event)"
