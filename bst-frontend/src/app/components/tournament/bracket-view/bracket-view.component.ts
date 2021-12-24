import { Component, OnInit } from '@angular/core';
import { Tile } from 'src/app/interfaces/tile.model';
import { Set } from 'src/app/interfaces/set.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';
import { BracketData } from 'src/app/interfaces/bracket-data.model';

@Component({
  selector: 'app-bracket-view',
  templateUrl: './bracket-view.component.html',
  styleUrls: ['./bracket-view.component.css']
})
export class BracketViewComponent implements OnInit {

  eventId: string = 'edde8206-78cb-4c59-8125-dc8ca3c8fe97';
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  bracket: Tile[][] = [];
  bracketData: Set[] = [];

  depth1: Tile[] = [
    {name: "Tony", gameNumber: 1, statusColor: "Red", score: ""},
    {name: "Kyle", gameNumber: 1, statusColor: "Green", score: ""},
    {name: "Gus", gameNumber: 2, statusColor: "Red", score: ""},
    {name: "Alex", gameNumber: 2, statusColor: "Green", score: ""},
    {name: "Zoe", gameNumber: 1, statusColor: "Red", score: ""},
    {name: "Alan", gameNumber: 1, statusColor: "Green", score: ""},
    {name: "Tim", gameNumber: 2, statusColor: "Red", score: ""},
    {name: "Ryan", gameNumber: 2, statusColor: "Green", score: ""},
  ];

  depth2: Tile[] = [
    {name: "Kyle", gameNumber: 3, statusColor: "Orange", score: "21/16, 19/21, 21/5"},
    {name: "Alex", gameNumber: 3, statusColor: "Orange", score: ""},
    {name: "Zoe", gameNumber: 3, statusColor: "Orange", score: ""},
    {name: "Tim", gameNumber: 3, statusColor: "Orange", score: ""},
  ]

  depth3: Tile[] = [
    {name: "Kyle", gameNumber: -1, statusColor: "Orange", score: ""},
    {name: "Tim", gameNumber: 3, statusColor: "Orange", score: ""},
  ]

  depth4: Tile[] = [
    {name: "Tim", gameNumber: 3, statusColor: "Orange", score: ""},
  ]

  id: string[] = ['one', 'two', 'three', 'four']

  constructor(
    private tournamentDataService: TournamentDataService
  ) { }

  ngOnInit(): void {
    this.bracket.push(this.depth1);
    this.bracket.push(this.depth2);
    this.bracket.push(this.depth3);
    this.bracket.push(this.depth4);
    console.log(this.bracket);
    this.getBracketData(this.eventId);
  }

  getBracketData(eventId: string): void {
    this.tournamentDataService.getBracketData(eventId).subscribe(result => {
      console.log(result[0]);
      this.bracketData = result;
      console.log(result);
      console.log(this.bracketData);
      console.log(result);
      console.log(this.depth1.length);

    });
  }

}
