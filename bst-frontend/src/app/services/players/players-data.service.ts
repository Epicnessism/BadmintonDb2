import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PLAYERS_AUTOCOMPLETE } from 'src/app/routes.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersDataService {

  constructor(private http: HttpClient) { }

  getPlayersAutocomplete(playerIdentifier: string): Observable<any> {
    let apiURL = `${environment.backendURL}${PLAYERS_AUTOCOMPLETE}/${playerIdentifier}`
    console.log(apiURL)
    return this.http.get<any>(apiURL, {withCredentials: true})
  }

}
