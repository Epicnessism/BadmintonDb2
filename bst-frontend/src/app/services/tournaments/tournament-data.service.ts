import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { EventMetaData } from 'src/app/interfaces/event-meta-data.model';
import { TournamentMetaData } from 'src/app/interfaces/tournament-meta-data.model';
import { environment } from 'src/environments/environment';
import { BracketData } from '../../interfaces/bracket-data.model';
import { Set } from '../../interfaces/set.model';
import { ADDPLAYERSTOEVENTS, EVENT, GET_EVENT_METADATA, SEEDING, SIGN_UP_META_DATA, TOURNAMENTS, TOURNAMENT_EVENT_BRACKET_DATA, TOURNAMENT_EVENT_COMPLETED_SET, TOURNAMENT_EVENT_META_DATA, TOURNAMENT_EVENT_UPDATE_SET, TOURNAMENT_META_DATA, UPCOMING, UPDATEEVENTSTOPLAYERS, UPDATESTATE } from '../../routes.constants';

@Injectable({
  providedIn: 'root'
})
export class TournamentDataService {

  private tournamentId: string = ''

  //* this creates a hashmap by eventId of all that event's Metadata for easy access when multiple events are present
  private eventMetaDataMap: Map<string, EventMetaData> = new Map()
  private eventMetaDataSubject: Subject<Map<string, EventMetaData>> = new Subject()
  private tournamentMetaData?: TournamentMetaData;
  private tournamentMetaDataSubject: Subject<TournamentMetaData> = new Subject()
  private upcomingSetsDataSubject: Subject<any> = new Subject()
  private upcomingSetsData?: any;


  // private bracketIds //todo deal with this later...aiya

  constructor(private http: HttpClient) {
  }

  getTournamentId(): string {
    return this.tournamentId
  }

  getEventMetaData(): Subject<Map<string, EventMetaData>> {
    return this.eventMetaDataSubject
  }

  //todo implement usage of this method
  subTournamentMetaData(): Subject<TournamentMetaData> {
    return this.tournamentMetaDataSubject
  }

  subUpcomingSetsData(): Subject<any> {
    return this.upcomingSetsDataSubject
  }

  //* gets actual event metadata from the db
  pullEventMetaData(eventId: string): void {
    let apiURL = `${environment.backendURL}${EVENT}${GET_EVENT_METADATA}${eventId}`
    console.log(apiURL)
    this.http.get<any>(apiURL).subscribe( result => {
      console.log(result)
      this.eventMetaDataMap.set(eventId, result[0])
      this.eventMetaDataSubject.next(this.eventMetaDataMap)
    })
  }

  //* gets actual bracket data for an event from the db
  pullBracketsMetaData(eventId: string): void {
    let apiURL = `${environment.backendURL}${TOURNAMENT_EVENT_META_DATA}${eventId}`
    console.log(apiURL)
    this.http.get<any>(apiURL).subscribe( result => {
      if(this.eventMetaDataMap.get(eventId) != undefined) {
        //! WHY THE FUCK DO I NEED THE ! HERE....WTF MAN
        this.eventMetaDataMap.get(eventId)!.eventBracketMetaData = result
        this.eventMetaDataSubject.next(this.eventMetaDataMap)
      }
    })
  }

  //* gets actual tournament data from the db
  pullTournamentMetaData(tournamentId: string): void {
    //TODO implement this and refactor tournamentService
    let apiURL = `${environment.backendURL}${TOURNAMENT_META_DATA}${tournamentId}`
    console.log(apiURL);
    this.http.get<any>(apiURL).subscribe( result => {
      console.log(result);
      this.tournamentMetaData = result
      this.tournamentMetaDataSubject.next(this.tournamentMetaData!)
    })
  }

  pullUpcomingSets(tournamentId: string) {
    let apiURL = `${environment.backendURL}${TOURNAMENTS}/${tournamentId}/${UPCOMING}`
    console.log(apiURL);
    this.http.get<any>(apiURL).subscribe( result => {
      console.log(result);
      this.upcomingSetsData = result
      this.upcomingSetsDataSubject.next(this.upcomingSetsData!)
    })
  }

  getBracketData(bracketId: string): Observable<Set[]> {
    let apiURL = `${environment.backendURL}${TOURNAMENT_EVENT_BRACKET_DATA}${bracketId}`
    console.log(apiURL)
    return this.http.get<Set[]>(apiURL)
  }

  getPlayerSignUpData(tournamentId: string, activePlayerId: string): Observable<any> {
    let apiURL = `${environment.backendURL}${TOURNAMENT_META_DATA}${tournamentId}/${SIGN_UP_META_DATA}${activePlayerId}`
    console.log(apiURL);
    return this.http.get<any>(apiURL, { withCredentials: true })
  }

  postUpdateSetData(setData: Set): Observable<Set[]> {
    let apiURL = `${environment.backendURL}${TOURNAMENT_EVENT_UPDATE_SET}`
    console.log(setData);
    console.log(apiURL);
    return this.http.post<any>(apiURL, setData, { withCredentials: true }).pipe(catchError(this.errorHandler))
  }

  postCompletedSetData(setData: Set): Observable<Set[]> {
    let apiURL = `${environment.backendURL}${TOURNAMENT_EVENT_COMPLETED_SET}`
    console.log(setData);
    console.log(apiURL);
    return this.http.post<any>(apiURL, setData, { withCredentials: true })
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || "server error"))
  }

  // getTournamentMetaData(tournamentId: string): Observable<any> {
  //   let apiURL = `${environment.backendURL}${TOURNAMENT_META_DATA}${tournamentId}`
  //   console.log(apiURL);
  //   return this.http.get<any>(apiURL)
  // }

  postTournamentMetaData(tournamentData: any): Observable<any> {
    let apiURL = `${environment.backendURL}${TOURNAMENTS}`
    console.log(apiURL);
    return this.http.post<any>(apiURL, tournamentData, { withCredentials: true })
  }

  //todo possibly split this out into its own service?
  getSeedings(eventId: string) {
    let apiURL = `${environment.backendURL}${EVENT}${eventId}/${SEEDING}`
    console.log(apiURL);
    return this.http.get<any>(apiURL, {withCredentials: true})

  }

  saveSeedings(eventId: string, seedings: object) {
    let apiURL = `${environment.backendURL}${EVENT}${eventId}/${SEEDING}`
    console.log(apiURL);
    console.log(seedings);

    return this.http.post<any>(apiURL, seedings, {withCredentials: true})
  }

  sendStartEvent(payload: any) { //todo add type for this later
    let apiURL = `${environment.backendURL}${EVENT}/${UPDATESTATE}`
    console.log(apiURL);

    return this.http.post<any>(apiURL, payload, {withCredentials: true})
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
  //     ]
  // }
  postAddPlayersToEvents(data: any): Observable<any> {
    let apiUrl = `${environment.backendURL}${TOURNAMENTS}/${ADDPLAYERSTOEVENTS}`
    console.log(apiUrl);
    return this.http.post<any>(apiUrl, data, { withCredentials: true })

  }

  postUpdateEventsToPlayers(data: any): Observable<any> {
    let apiUrl = `${environment.backendURL}${TOURNAMENTS}/${UPDATEEVENTSTOPLAYERS}`
    console.log(apiUrl);
    return this.http.post<any>(apiUrl, data, { withCredentials: true })
  }

}
