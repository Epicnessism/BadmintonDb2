import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { Tile } from 'src/app/interfaces/tile.model';
import { Set } from 'src/app/interfaces/set.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';
import { BracketData } from 'src/app/interfaces/bracket-data.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ValidGameDataService } from 'src/app/services/valid-game-data.service';

@Component({
  selector: 'app-bracket-view',
  changeDetection: ChangeDetectionStrategy.Default, //TODO FIX THIS SO WE CAN UPDATE OUR DATA
  templateUrl: './bracket-view.component.html',
  styleUrls: ['./bracket-view.component.css']
})
export class BracketViewComponent implements OnInit {

  eventId: string = 'edde8206-78cb-4c59-8125-dc8ca3c8fe97'
  bracketMetaData: Map<string,string> = new Map()
  bracket: any[][] = []
  bracketData: Set[] = []

  depth1: any[] = []

  depth2: any[] = []

  depth3: any[] = []

  depth4: any[] = []

  id: string[] = ['one', 'two', 'three', 'four']

  constructor(
    private tournamentDataService: TournamentDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.bracketMetaData.set('bracketSize', '16');

    this.getBracketData(this.eventId);
  }

  openDialog(setData: Set) {
    console.log(setData);
    const dialogRef = this.dialog.open(SetDetailsDiaglogComponent, {data: setData});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getBracketData(eventId: string): void {
    this.tournamentDataService.getBracketData(eventId).subscribe(result => {
      console.log(result);
      this.bracketData = result;
      console.log(this.bracketData);
      console.log(this.bracketData[0]);
      console.log(this.bracketData.length);
      this.splitBracketData();
    });
  }

  splitBracketData(): void {
    let bracketsize = this.bracketMetaData.get("bracketSize")!;
    console.log(bracketsize);
    this.depth1 = this.bracketData.splice(0, parseInt(bracketsize) /2);
    console.log(this.depth1);

    this.bracket.push(this.depth1);
    this.bracket.push(this.depth2);
    this.bracket.push(this.depth3);
    this.bracket.push(this.depth4);
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
    @Inject(MAT_DIALOG_DATA) public setData: Set,
    private validGameDataService: ValidGameDataService
  ) {}

  updateSet(): void {
    let isValidPoints = this.validGameDataService.validateGamePointsStrings(this.setData.team_1_points, this.setData.team_2_points)
    console.log(`the validity of the set points is: ${isValidPoints}`);

    let isValidNumberOfGames = false //todo add this, requires reading metadata

    if(isValidPoints) {
      console.log(this.setData);
      this.tournamentDataService.postSetData(this.setData).subscribe( result => {
        console.log(result);
        if(result != null) {
          this.onNoClick()
        } else {
          console.log("Error updating set!");

        }
      })
    }

  }


  completedSet(): void {
    //TODO do logic for setting completed value and winning team value before calling updateSet
    this.updateSet()
  }

  validateInput(setData: Set, gameNumber: number, event: any): boolean {
    console.log(event)
    return true
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}

// un-used code that works for getting each change event of a form input
// (ngModelChange)="validateInput(setData, ind, $event)"
