import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventBracketMetaData } from 'src/app/interfaces/event-brackets-meta-data.model';
import { EventMetaData } from 'src/app/interfaces/event-meta-data.model';
import { TournamentMetaData } from 'src/app/interfaces/tournament-meta-data.model';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { TournamentDataService } from 'src/app/services/tournaments/tournament-data.service';

interface EventState {
  name: string;
  value: string;
}

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
  tournamentMetaData : TournamentMetaData | undefined
  activePlayerId: string = localStorage.getItem('userId') || '' //? should this be empty string or undefined???


  manageEventOptions: EventState[] = [
    {
      name: 'Start',
      value: "In Progress"
    },
    {
      name: 'Restart',
      value: 'Not Started'
    },
    {
      name: 'Finished',
      value: 'Finished'
    }
  ]

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

    this.tournamentDataService.subTournamentMetaData().subscribe( result => {
      console.log(result);
      this.tournamentMetaData = result

      this.calculateIsAdmin()
    })

    // this.getData() //! UNTIL I FIGURE OUT HOW TO STRUCTURE MULTIPLE API CALLS IN SYNCHRONOUS ORDER....
  }

  calculateIsAdmin(): void {
    // console.log(this.tournamentMetaData?.tournamentAdmins.map( admin => admin.user_id));
    this.isTournamentAdmin = this.tournamentMetaData?.tournamentAdmins.map( admin => admin.user_id).includes(this.activePlayerId) ? true : false
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
    this.requestEventBracketsData(this.eventId)
    this.requestTournamentMetaData(this.tournamentId)

  }

  requestTournamentMetaData(tournamentId: string) { //todo enhance this to get tournamentAdmin data as well
    this.tournamentDataService.pullTournamentMetaData(this.tournamentId)
  }

  requestEventMetaData(eventId: string) {
    this.tournamentDataService.pullEventMetaData(eventId)
  }

  requestEventBracketsData(eventId: string) {
    this.tournamentDataService.pullBracketsMetaData(eventId)
  }

  toggleManageTournament(): void {
    this.isManagingTournament = !this.isManagingTournament
    console.log(this.isManagingTournament)
    console.log(this.tournamentMetaData);
  }


  sendEventStatus(option: string): void {
    console.log(`testing send event status button: ${option}`);
    // ? add logic for forcing the status change??
    let payload : any = {
      "eventId" : this.eventId,
      "tournamentId": this.tournamentId,
      "state" : option
    }
    console.log(payload);
    this.tournamentDataService.sendStartEvent(payload).subscribe(results => {
      console.log(results);

    })
  }


}
