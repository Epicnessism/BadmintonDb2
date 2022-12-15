import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'aws-sdk/clients/ssmcontacts';
import { TournamentDataService } from 'src/app/services/tournaments/tournament-data.service';

@Component({
  selector: 'app-upcoming-view',
  templateUrl: './upcoming-view.component.html',
  styleUrls: ['./upcoming-view.component.css']
})
export class UpcomingViewComponent implements OnInit {
  upcomingSetsData: any //* tbd make data model for this

  constructor(private tournamentDataService: TournamentDataService) { }

  ngOnInit(): void {
    this.tournamentDataService.subTournamentMetaData()
    // console.log(this.upcomingSetsData);
    this.tournamentDataService.subUpcomingSetsData().subscribe( data => {
      console.log(data);
      this.upcomingSetsData = data
    })

    // console.log(this.tournamentId) //im surprised this doesn't fail
    // this.tournamentDataService.pullUpcomingSets(this.tournamentId)
  }

  // subscribeUpcomingSetsData(): void {

  // }

}
