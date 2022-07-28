import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventSignUpMetaData } from 'src/app/interfaces/event-sign-up-meta-data.model';
import { TournamentMetaData } from 'src/app/interfaces/tournament-meta-data.model';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-tournament-view',
  templateUrl: './tournament-view.component.html',
  styleUrls: ['./tournament-view.component.css']
})
export class TournamentViewComponent implements OnInit {

  tournamentId: string = ''
  tournamentData: TournamentMetaData[] = []
  eventsToRegister: EventSignUpMetaData[] = []
  isSignUp: boolean = false

  constructor(
    private tournamentDataService: TournamentDataService,
    private _activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPathParam()
    this.getData()
  }

  openSignUpDialog() {
    let wrapData = this.tournamentData
    const dialogRef = this.dialog.open(TournamentSignUpDialogComponent, {data: wrapData });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getPathParam(): void {
    this._activatedRoute.paramMap.subscribe( params => {
      console.log(params);
      this.tournamentId = params.get('tournamentId') != null ? params.get('tournamentId') as string : ''
    })
  }

  async getData() {
    await this.getTournamentMetaData(this.tournamentId);
  }

  async getTournamentMetaData(tournamentId: string) {
    this.tournamentDataService.getTournamentMetaData(tournamentId).subscribe(result => {
      console.log(result);
      this.tournamentData = result
    });
  }

  goToEvent(eventId: string): void {
    this.navigationService.navigateByRelativePath(`events/${eventId}`, this._activatedRoute)
  }

  signUp(): void {
    console.log(this.eventsToRegister);
    console.log(this.tournamentData);
    this.isSignUp = true;

    //* add players to events first
    // this.tournamentDataService.postAddPlayersToEvents()
    //* then update events to players tables
  }

}

@Component({
  selector: 'dialog-tournament-sign-up',
  templateUrl: 'dialog-tournament-sign-up.html',
})
export class TournamentSignUpDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TournamentSignUpDialogComponent>,
    private tournamentDataService: TournamentDataService,
    @Inject(MAT_DIALOG_DATA) public wrapData: any, //TODO look into how to make this not one object...
  ) {
    this.tournamentData = wrapData;
    console.log(this.tournamentData);
  }

  step = 0;
  tournamentData: TournamentMetaData[] = []

  setStep(index: number) {
    this.step = index;
    console.log(this.step);
  }

  nextStep() {
    this.step++;
    console.log(this.step);

  }

  prevStep() {
    this.step--;
    console.log(this.step);
  }

  async confirmSignUp(): Promise<void> {
    await this.addPlayerToEvents()

    await this.updateEventsToPlayers()
  }

  async addPlayerToEvents(): Promise<void> {

  }

  async updateEventsToPlayers(): Promise<void> {

  }
}
