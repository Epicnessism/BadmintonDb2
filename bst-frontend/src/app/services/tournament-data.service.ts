import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BracketData } from '../interfaces/bracket-data.model';
import { Set } from '../interfaces/set.model';
import { TOURNAMENT_EVENT_BRACKET_DATA, TOURNAMENT_EVENT_COMPLETED_SET, TOURNAMENT_EVENT_META_DATA, TOURNAMENT_EVENT_UPDATE_SET } from './../routes.constants';

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

  postUpdateSetData(setData: Set): Observable<Set[]> {
    let apiURL = `${environment.backendURL}${TOURNAMENT_EVENT_UPDATE_SET}`
    console.log(setData);
    console.log(apiURL);
    return this.http.post<any>(apiURL, setData,  {withCredentials: true}).pipe(catchError(this.errorHandler))
  }

  postCompletedSetData(setData: Set): Observable<Set[]> {
    let apiURL = `${environment.backendURL}${TOURNAMENT_EVENT_COMPLETED_SET}`
    console.log(setData);
    console.log(apiURL);
    return this.http.post<any>(apiURL, setData,  {withCredentials: true})
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError( () => new Error(error.message || "server error") )
  }

}
