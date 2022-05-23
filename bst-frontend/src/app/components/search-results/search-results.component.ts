import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchParam: string = '';

  filters = {
    sets: false,
    players: false,
    tournaments: false,
    events: false,
    games: false
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private searchService: SearchService
    ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe( params => {
      console.log(params);
      this.searchParam = params.get('searchParam') != null ? params.get('searchParam') as string : ''

    })
  }

  search(): void {
    //* do search to db here...
    console.log(this.filters);
    this.searchService.getSearchResults(this.searchParam, {"filters": this.filters}).subscribe( result => {
      console.log(result);

    })

  }

}
