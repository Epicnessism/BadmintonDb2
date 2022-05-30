import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-create-view',
  templateUrl: './create-view.component.html',
  styleUrls: ['./create-view.component.css']
})
export class CreateViewComponent implements OnInit {

  tournamentForm = this.fb.group({
    tournamentName: ['', Validators.required],
    tournamentType: ['', Validators.required],
    // eventDates: ['', Validators.required], //TODO add this back later after implementing
    eventsArray: this.fb.array([])
  })

  get eventsArray(): FormArray {
    return this.tournamentForm.get('eventsArray') as FormArray;
  }

  addEvent() {
    let eventForm = this.fb.group({
      eventName: new FormControl('', Validators.required),
      eventType: new FormControl('', Validators.required), //MS, WS, MD, WD, XD, SS, DD
      eventSize: new FormControl('', Validators.required),
    })
    this.eventsArray.push(eventForm)
  }

  removeEvent(eventIndex: number): void {
    this.eventsArray.removeAt(eventIndex);
  }

  constructor(
    private navigationService: NavigationService,
    private fb: FormBuilder,
    private tournamentDataService: TournamentDataService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('onsubmit');

    let response = this.createTournament()
    // this.navigationService.navigateByUrl(`tournament/${response.tournamentId}`)
  }

  async createTournament() {
    let response = await this.tournamentDataService.postTournamentMetaData(this.tournamentForm.value).subscribe( result => {
      console.log(result);

    });
    console.log(response);

    return  response
  }





}
