import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournament-view',
  templateUrl: './tournament-view.component.html',
  styleUrls: ['./tournament-view.component.sass']
})
export class TournamentViewComponent implements OnInit {

  firstRoundOfPlayers : string[] = ['Tony', 'Zoe', 'Gus', 'Kyle', 'Alex', 'Alan', 'Tim', 'Joe'];
  secondRoundPlayers : string[] = ['Tony', 'Kyle', 'Alex', 'Tim'];
  thirdRoundPlayers : string[] = ['Kyle', 'Tim'];
  bracketSize: number = 16;

  bracketDepth: number = Math.log2(this.bracketSize);

  names: string[] = ['Tony', 'Zoe', 'Gus', 'Kyle', 'Alex', 'Alan', 'Tim', 'Joe'];

  constructor() { }

  ngOnInit(): void {
  }

}
