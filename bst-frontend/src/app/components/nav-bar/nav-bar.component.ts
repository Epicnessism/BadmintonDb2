import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  searchString: string = '';
  sideNavOptions = [{name:"Create a tournament", path: "tournaments/create"}]

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {}

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

}
