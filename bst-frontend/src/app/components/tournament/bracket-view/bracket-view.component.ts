import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Tile } from 'src/app/interfaces/tile.model';
import { Set } from 'src/app/interfaces/set.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';
import { BracketData } from 'src/app/interfaces/bracket-data.model';

@Component({
  selector: 'app-bracket-view',
  changeDetection: ChangeDetectionStrategy.Default, //TODO FIX THIS SO WE CAN UPDATE OUR DATA
  templateUrl: './bracket-view.component.html',
  styleUrls: ['./bracket-view.component.css']
})
export class BracketViewComponent implements OnInit {

  eventId: string = 'edde8206-78cb-4c59-8125-dc8ca3c8fe97';
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
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
    private tournamentDataService: TournamentDataService
  ) { }

  ngOnInit(): void {


    this.getBracketData(this.eventId);

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
    this.depth1 = this.bracketData.splice(0,8);
    console.log(this.depth1);

    this.bracket.push(this.depth1);
    this.bracket.push(this.depth2);
    this.bracket.push(this.depth3);
    this.bracket.push(this.depth4);
    console.log(this.bracket);
  }

}
