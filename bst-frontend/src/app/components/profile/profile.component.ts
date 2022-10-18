import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerProfileData } from 'src/app/interfaces/player-profile-metadata.model';
import { PlayersDataService } from 'src/app/services/players/players-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  playerId: string = ''
  playerMetaData!: PlayerProfileData;
  playerInitials?: string = ''

  constructor(
    private playersDataService: PlayersDataService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getUserId()
    this.getPlayerProfileMetaData()
  }

  getUserId(): void {
    const userId = localStorage.getItem('userId')
    this.playerId = userId ? userId : ''
  }

  getPlayerProfileMetaData(): void {
    this.playerMetaData = this.playersDataService.getPlayerMetaData()
  }

}
