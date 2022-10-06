import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMetaData } from 'src/app/interfaces/event-meta-data.model';
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

  eventNotStarted: boolean = true
  isManagingTournament: boolean = true
  isTournamentAdmin: boolean = true

  constructor(
    private tournamentDataService: TournamentDataService,
    private _activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.getPathParam()
    this.getData()
  }

  getPathParam(): void {
    this._activatedRoute.paramMap.subscribe( params => {
      console.log(params);
      this.eventId = params.get('eventId') != null ? params.get('eventId') as string : ''
      //TODO get tournamentId somehow....instead of using getData()[0]
    })
  }

  async getData() {
    await this.getEventMetaData(this.eventId);
    await this.getEventBracketsData(this.eventId);
  }

  async getEventMetaData(eventId: string) {
    this.tournamentDataService.getEventMetaData(eventId).subscribe(result => {
      console.log(result);
      this.eventMetaData = result[0]
    });
  }

  async getEventBracketsData(eventId: string) {
    this.tournamentDataService.getEventBracketsData(eventId).subscribe(result => {
      console.log(result);
      this.eventData = result
      this.tournamentId = this.eventData[0].tournament_id
    });
  }

  toggleManageTournament(): void {
    this.isManagingTournament = !this.isManagingTournament
    console.log(this.isManagingTournament)

  }


}
