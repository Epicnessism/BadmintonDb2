import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { Tile } from 'src/app/interfaces/tile.model';
import { Set } from 'src/app/interfaces/set.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';
import { BracketData } from 'src/app/interfaces/bracket-data.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface SetData {
  eventGameNumber: number;
  eventId: string; //TODO uuid type in the future?
  gameType: string;
  setId: string;
  t1_names: string[];
  t1_player_ids: string[];
  t1_pts: string[][];
  t2_names: string[];
  t2_player_ids: string[];
  t2_pts: string[][];
}


@Component({
  selector: 'app-bracket-view',
  changeDetection: ChangeDetectionStrategy.Default, //TODO FIX THIS SO WE CAN UPDATE OUR DATA
  templateUrl: './bracket-view.component.html',
  styleUrls: ['./bracket-view.component.css']
})
export class BracketViewComponent implements OnInit {

  eventId: string = 'edde8206-78cb-4c59-8125-dc8ca3c8fe97';
  bracketMetaData: Map<string,string> = new Map();
  bracket: any[][] = [];
  bracketData: any[] = [];

  depth1: any[] = [];

  depth2: any[] = [
    {name: "Kyle", gameNumber: 3, statusColor: "Orange", score: "21/16, 19/21, 21/5"},
    {name: "Alex", gameNumber: 3, statusColor: "Orange", score: ""},
    {name: "Zoe", gameNumber: 3, statusColor: "Orange", score: ""},
    {name: "Tim", gameNumber: 3, statusColor: "Orange", score: ""},
  ]

  depth3: any[] = [
    {name: "Kyle", gameNumber: -1, statusColor: "Orange", score: ""},
    {name: "Tim", gameNumber: 3, statusColor: "Orange", score: ""},
  ]

  depth4: any[] = [
    {name: "Tim", gameNumber: 3, statusColor: "Orange", score: ""},
  ]

  id: string[] = ['one', 'two', 'three', 'four']

  constructor(
    private tournamentDataService: TournamentDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.bracketMetaData.set('bracketSize', '16');

    this.getBracketData(this.eventId);
  }

  openDialog(setData: any) { //TODO add data interface for setData
    console.log(setData);
    const dialogRef = this.dialog.open(SetDetailsDiaglogComponent, {data: setData});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getBracketData(eventId: string): void {
    this.tournamentDataService.getBracketData(eventId).subscribe(result => {
      this.bracketData = result.result;
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
    @Inject(MAT_DIALOG_DATA) public setData: SetData,
  ) {}

  updateSet(): void {
    //TODO add functionality here
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
