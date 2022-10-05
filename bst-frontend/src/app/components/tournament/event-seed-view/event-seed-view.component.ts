import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventBracketMetaData } from 'src/app/interfaces/event-brackets-meta-data.model';
import { EventMetaData } from 'src/app/interfaces/event-meta-data.model';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-event-seed-view',
  templateUrl: './event-seed-view.component.html',
  styleUrls: ['./event-seed-view.component.css']
})
export class EventSeedViewComponent implements OnInit {


  eventId: string = ''
  @Input() eventBracketMetaData: EventBracketMetaData | undefined
  @Input() eventMetaData: EventMetaData | undefined
  seedList: any[] = []

  constructor(
    private tournamentDataService: TournamentDataService,
  ) { }

  ngOnInit(): void {
    this.eventId = this.eventMetaData?.event_id ?? ''
    console.log(this.eventMetaData);
    console.log(this.eventId);

    this.getSeedings()
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.seedList, event.previousIndex, event.currentIndex)
    this.mapNewSeedValues()
  }

  getSeedings(): void {
    this.tournamentDataService.getSeedings(this.eventId).subscribe( result => {
      console.log(result);
      this.seedList = result
    })
  }

  pushNewSeedings(): void {
    const seedings: object = {
      "bracket_id" : this.eventBracketMetaData?.bracket_id ?? '',
      "is_doubles" : this.eventMetaData?.is_doubles ?? '',
      "event_size": this.eventMetaData?.event_size ?? '',
      "seedings" : this.constructNewSeedingsPayload()
    }
    this.tournamentDataService.saveSeedings(this.eventId, seedings).subscribe( result => {
      console.log(result);
    })
  }


  // updateSeedingPredicate(indexToBe: number, item: CdkDrag<any>) {
  //   console.log(index);
  //   console.log(item.data);
  //   item.data.seeding = indexToBe
  //   return true
  // }

  mapNewSeedValues(): void {
    this.seedList.forEach( (entry, index) => {
      entry.seeding = index+1
    })
    console.log(this.seedList);
  }

  //todo define data model for seedingsArray
  constructNewSeedingsPayload(): any[] {
    const seedings: any[] = []
    this.seedList.forEach( entry => {
      seedings.push({team_id: entry.teamId, seeding: entry.seeding, event_id: this.eventId})
    })
    return seedings
  }

}
