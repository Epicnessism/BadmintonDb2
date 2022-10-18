import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { PlayersDataService } from 'src/app/services/players/players-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  searchString: string = ''
  playerInitials: string = ''
  // playerInitials: Subscription = new Subscription;
  sideNavOptions = [{name:"Create a tournament", path: "tournaments/create"}]

  constructor(
    private navigationService: NavigationService,
    private playersDataService: PlayersDataService,
    ) { }

  ngOnInit(): void {
    console.log("at ngInit for navbar");

    this.playersDataService.getPlayerInitials().subscribe(result => {
      console.log(result)
      this.playerInitials = result
      // return result
    })
    // this.playersDataService.getPlayerInitials().subscribe(
    //   {
    //     next(initials: string) {
    //       console.log(initials)
    //       const temp = initials
    //     },
    //     complete() {
    //       console.log('done')
    //     }
    //   }
    // )
  }

  goHome(): void {
    this.navigationService.navigateByUrl('/')
  }

  goProfile(): void {
    this.navigationService.navigateByUrl('/profile')
  }

  searchAndGoToResultsPage(): void {
    console.log(this.searchString);
    this.navigationService.navigateByUrl(`search/${this.searchString}`)
    //*hit api search, if return valid values, navigate to that url
  }

  setProfileIconInitials() {

  }

}
