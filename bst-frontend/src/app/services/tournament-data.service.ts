import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BracketData } from '../interfaces/bracket-data.model';
import { Set } from '../interfaces/set.model';
import { ADDPLAYERSTOEVENTS, SIGN_UP_META_DATA, TOURNAMENTS, TOURNAMENT_EVENT_BRACKET_DATA, TOURNAMENT_EVENT_COMPLETED_SET, TOURNAMENT_EVENT_META_DATA, TOURNAMENT_EVENT_UPDATE_SET, TOURNAMENT_META_DATA, UPDATEEVENTSTOPLAYERS } from './../routes.constants';

@Injectable({
  providedIn: 'root'
})
export class TournamentDataService {

  constructor(private http: HttpClient) {
  }

  getEventMetaData(eventId: string): Observable<any> {
    let apiURL = `${environment.backendURL}${TOURNAMENT_EVENT_META_DATA}${eventId}`
    console.log(apiURL)
    return this.http.get<any>(apiURL)
  }

  getBracketData(eventId: string): Observable<Set[]> {
    let apiURL = `${environment.backendURL}${TOURNAMENT_EVENT_BRACKET_DATA}${eventId}`
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

  getTournamentMetaData(tournamentId: string): Observable<any> {
    let apiURL = `${environment.backendURL}${TOURNAMENT_META_DATA}${tournamentId}`
    console.log(apiURL);
    return this.http.get<any>(apiURL)
  }

  postTournamentMetaData(tournamentData: any): Observable<any> {
    let apiURL = `${environment.backendURL}${TOURNAMENTS}`
    console.log(apiURL);
    return this.http.post<any>(apiURL, tournamentData, { withCredentials: true })
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
