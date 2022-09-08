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


//DIALOG COMPONENT ------------------------------------------------------------------------------------


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
    console.log("----------------THIS LOG SHOULD COME AFTER ALL ACTIONS ARE COMPLETE----------------");

  }

//   {
//     "tournamentId": "9fc06fa2-053d-45e9-8078-ee0c36d44b3d",
//     "events": [
//         {
//             "eventId": "28a7873c-7940-42c4-b271-a27b6d899e4d",
//             "playersToAdd": [
//                 "123e4567-e89b-12d3-a456-426614174000",
//                 "101e4567-e89b-12d3-a456-426614174111"
//             ]
//         }
//     ],
//
// }
  async addPlayerToEvents(): Promise<void> {
    //* create the data object to send to the backend
    let eventsOfPlayersToAdd: any[] = []

    console.log(this.signUpForm.value);
    // let eventSignUpMap = new Map(this.signUpFormForm.value.map(key => [key.]))

    let listOfEventIdsSignedUp = this.tournamentData.map( eventData => {

      //todo what did i do here?
      // if( eventData.eventId == )
      return eventData.eventId
    } )

    let payload = {
      tournamentId: this.tournamentData[0].tournamentId,
      players: [
        {
          "playerId": localStorage.getItem('userId'),
          "eventsToAdd": listOfEventIdsSignedUp
        }
      ]
    }

    console.log(payload);

    this.tournamentDataService.postAddPlayersToEvents(payload).subscribe(result => {
      console.log(result);
    });

    //? maybe do a return here to force sequenctialness


  }

  async updateEventsToPlayers(): Promise<void> {

    console.log(this.tournamentData);




    for(let event of this.tournamentData) {
      console.log(event);
      // let entry = {
      //   event_id: event.eventId
      // }

    }


    let payload = {
      //TODO create the payload NEXT STEP 9/7/22
      // event_id: this.tournamentData.eventId,

    }

    console.log(payload);


    this.tournamentDataService.postUpdateEventsToPlayers(payload).subscribe( result => {
      console.log(result);
    })
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
