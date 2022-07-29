import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { EventSignUpMetaData } from 'src/app/interfaces/event-sign-up-meta-data.model';
import { PlayerAutocompleteData } from 'src/app/interfaces/player-autocomplete-data.model';
import { TournamentMetaData } from 'src/app/interfaces/tournament-meta-data.model';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { PlayersDataService } from 'src/app/services/players/players-data.service';
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
  styleUrls: ['./tournament-view.component.css']
})
export class TournamentSignUpDialogComponent {

  signUpForm = this.fb.group({
    eventFormArray: this.fb.array([])
  });
  public get eventFormArray() {
    return this.signUpForm.get('eventFormArray') as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<TournamentSignUpDialogComponent>,
    private tournamentDataService: TournamentDataService,
    private playersDataService: PlayersDataService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public wrapData: any, //TODO look into how to make this not one object...
  ) {
    this.tournamentData = wrapData;
    console.log(this.tournamentData);

    for (let _temp in this.tournamentData) {
      let eventForm = this.fb.group({
        partnerName : new FormControl(''),
        isSignUp : false,
      })
      this.eventFormArray.push(eventForm);
    }
  }

  step = -1;
  tournamentData: TournamentMetaData[] = []
  autoCompleteOptions: PlayerAutocompleteData[] = [];

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


  calculateAutocomplete(keyboardEvent: KeyboardEvent, formControlIndex: number): void {
    console.log(this.signUpForm.value);
    console.log(keyboardEvent);
    console.log(formControlIndex);


    let pattern = /[A-Za-z -]/
    let regex = new RegExp(pattern)

    if(!regex.test(keyboardEvent.key) || keyboardEvent.key.length != 1) {
      console.log("error, not a valid char");
      return
    }

    let searchParam = this.eventFormArray.controls[formControlIndex].value['partnerName']
    console.log(searchParam);

    if(searchParam.length >= 3) {
      console.log("more than 3, go fetch")
      this.playersDataService.getPlayersAutocomplete(searchParam)
      .subscribe( result => {
        console.log(result);
        this.autoCompleteOptions = result
      })
    } else {
      console.log("less than 3, do nothing");
    }
  }

}
