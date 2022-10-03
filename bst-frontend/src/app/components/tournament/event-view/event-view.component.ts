import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  eventId: string = ''
  eventData: any[] = []

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
    })
  }

  async getData() {
    await this.getEventMetaData(this.eventId);
  }


  async getEventMetaData(eventId: string) {
    this.tournamentDataService.getEventMetaData(eventId).subscribe(result => {
      console.log(result);
      this.eventData = result
    });
  }

  toggleManageTournament(): void {
    this.isManagingTournament = !this.isManagingTournament
    console.log(this.isManagingTournament)

  }


}
