import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PLAYERS } from 'src/app/routes.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersDataService {

  constructor(private http: HttpClient) { }

  getPlayersData(playerName: string): Observable<any> {
    let apiURL = `${environment.backendURL}${PLAYERS}${playerName}`
    console.log(apiURL)
    return this.http.get<any>(apiURL)
  }

}
