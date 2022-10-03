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

  tournamentId: string = ''; //TODO import UUID type later
  loading: boolean = false;


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

  async onSubmit() {
    this.loading = true;

    let response = await this.createTournamentAndRedirect()

    // this.navigationService.navigateByUrl(`tournament/${response.tournamentId}`)
  }

  async createTournamentAndRedirect() {
    console.log(this.tournamentForm.value);
    this.tournamentDataService.postTournamentMetaData(this.tournamentForm.value).subscribe(result => {
      console.log(result);
      this.tournamentId = result.tournamentId;
      this.loading = false;
      console.log(`navigating to this tournamentId: ${this.tournamentId}`);
      this.navigationService.navigateByUrl(`tournaments/${this.tournamentId}`);
    });
  }





}
