import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BracketData } from '../interfaces/bracket-data.model';
import { Set } from '../interfaces/set.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentDataService {

  constructor(private http: HttpClient) {
  }

  getBracketData(eventId: string): Observable<Set[]> {
    console.log(`${environment.backendURL}tournaments/getBracketSetData/${eventId}`)
    return this.http.get<Set[]>(`${environment.backendURL}tournaments/getBracketSetData/${eventId}`)
  }

  postSetData(setData: Set): Observable<Set[]> {
    console.log(`${environment.backendURL}tournaments/updateSet`);
    return this.http.post<any>(`${environment.backendURL}tournaments/updateSet`, setData,  {withCredentials: true})
  }

}
