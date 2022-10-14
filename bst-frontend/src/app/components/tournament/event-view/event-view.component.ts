import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMetaData } from 'src/app/interfaces/event-meta-data.model';
import { TournamentMetaData } from 'src/app/interfaces/tournament-meta-data.model';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  eventId: string = ''
  tournamentId: string = ''
  eventData: any[] = []
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
    this.getEventMetaData(this.eventId)
    this.getEventBracketsData(this.eventId)
    this.getTournamentMetaData(this.tournamentId)
  }

  getTournamentMetaData(tournamentId: string) { //todo enhance this to get tournamentAdmin data as well
    this.tournamentDataService.getTournamentMetaData(tournamentId).subscribe(result => {
      console.log(result);
      this.tournamentData = result[0]
      this.isTournamentAdmin = true
    });
  }

  getEventMetaData(eventId: string) {
    return this.tournamentDataService.getEventMetaData(eventId).subscribe(result => {
      console.log(result);
      this.eventMetaData = result[0]
    });
  }

  getEventBracketsData(eventId: string) {
    return this.tournamentDataService.getEventBracketsData(eventId).subscribe(result => {
      console.log(result);
      this.eventData = result
    });
  }

  toggleManageTournament(): void {
    this.isManagingTournament = !this.isManagingTournament
    console.log(this.isManagingTournament)

  }


}
