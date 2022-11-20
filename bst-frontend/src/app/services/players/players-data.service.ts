import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { PlayerProfileData } from 'src/app/interfaces/player-profile-metadata.model';
import { PLAYERS, PLAYERS_AUTOCOMPLETE, PROFILEDATA } from 'src/app/routes.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersDataService {

  private playerMetaData!: PlayerProfileData
  private playerInitials?: string
  private playerInitialsSubject: BehaviorSubject <string> = new BehaviorSubject('')

  constructor(private http: HttpClient) { }

  getPlayersAutocomplete(playerIdentifier: string): Observable<any> {
    let apiURL = `${environment.backendURL}${PLAYERS_AUTOCOMPLETE}/${playerIdentifier}`
    console.log(apiURL)
    return this.http.get<any>(apiURL, {withCredentials: true})
  }

  getPlayerProfileData(playerIdentifier: string): void {
    let apiURL = `${environment.backendURL}${PLAYERS}/${playerIdentifier}/${PROFILEDATA}`
    console.log(apiURL)
    this.http.get<any>(apiURL, {withCredentials: true}).subscribe( result => {
      console.log(result)
      this.playerMetaData = result
      this.calculateInitials()
    })
  }

  getPlayerMetaData(): PlayerProfileData {
    return this.playerMetaData
  }

  calculateInitials() {
    console.log("inside initials calcualtions")
    this.playerInitials = this.playerMetaData.givenName?.charAt(0).concat((this.playerMetaData.familyName) ? this.playerMetaData.familyName?.charAt(0) : '')
    console.log(this.playerInitials)
    localStorage.setItem('playerInitials', this.playerInitials || '')
    this.playerInitialsSubject.next(this.playerInitials ? this.playerInitials : '')
  }

  getPlayerInitials(): BehaviorSubject <string> {
    return this.playerInitialsSubject
  }


}
