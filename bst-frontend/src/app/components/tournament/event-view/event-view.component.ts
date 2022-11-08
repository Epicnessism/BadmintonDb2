import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventBracketMetaData } from 'src/app/interfaces/event-brackets-meta-data.model';
import { EventMetaData } from 'src/app/interfaces/event-meta-data.model';
import { TournamentMetaData } from 'src/app/interfaces/tournament-meta-data.model';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { TournamentDataService } from 'src/app/services/tournaments/tournament-data.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  eventId: string = ''
  tournamentId: string = ''
  // eventData: EventBracketMetaData[] = []
  eventMetaData : EventMetaData | undefined
  tournamentData : TournamentMetaData | undefined

  eventInProgress: boolean = false
  isManagingTournament: boolean = false
  isTournamentAdmin: boolean = false

  constructor(
    private tournamentDataService: TournamentDataService,
    private _activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.getPathParam()
    this.tournamentDataService.getEventMetaData().subscribe( result => {
      console.log(result)
      const eventResults = result.get(this.eventId)
      if(eventResults != undefined) {
        this.eventMetaData = eventResults
      }
      console.log(this.eventMetaData != undefined)

    })
    // this.getData() //! UNTIL I FIGURE OUT HOW TO STRUCTURE MULTIPLE API CALLS IN SYNCHRONOUS ORDER....
  }

  getPathParam(): void {
    this._activatedRoute.paramMap.subscribe( params => {
      console.log(params);
      this.eventId = params.get('eventId') != null ? params.get('eventId') as string : ''
      this.tournamentId = params.get('tournamentId') != null ? params.get('tournamentId') as string : ''
      this.getData()
    })
  }

  getData() {
    this.requestEventMetaData(this.eventId)
    this.getEventBracketsData(this.eventId)
    this.getTournamentMetaData(this.tournamentId)
  }

  getTournamentMetaData(tournamentId: string) { //todo enhance this to get tournamentAdmin data as well
    this.tournamentDataService.getTournamentMetaData(tournamentId).subscribe(result => {
      console.log(result);
      this.tournamentData = result
      console.log(this.tournamentData);

      this.isTournamentAdmin = true
    });
  }

  requestEventMetaData(eventId: string) {
    this.tournamentDataService.pullEventMetaData(eventId)
  }

  getEventBracketsData(eventId: string) {
    this.tournamentDataService.pullBracketsMetaData(eventId)
  }

  toggleManageTournament(): void {
    this.isManagingTournament = !this.isManagingTournament
    console.log(this.isManagingTournament)
    console.log(this.tournamentData);

  }

  toggleIsEventStarted(): void {
    console.log("testing toggle event start button");
  }


}
