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

  searchParam: string = ''
  searchResults: any = null; //todo create object interface for this response...

  filters = {
    sets: false,
    users: false,
    tournaments: false,
    events: false,
    games: false
  }

  useFilters: boolean = false

  constructor(
    private _activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private searchService: SearchService
    ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe( params => {
      console.log(params);
      this.searchParam = params.get('searchParam') != null ? params.get('searchParam') as string : ''
      this.search()
    })
  }

  calculateUseFilters() {
    console.log("calculateUseFilters");
    this.useFilters = Object.values(this.filters).includes(true)
  }

  search(): void {
    //* do search to db here...
    console.log(this.filters);
    // this.searchService.getSearchResults(this.searchParam, {"filters": this.filters}).subscribe( result => {
    //   console.log("this is inside the subscribe: ");
    //   console.log(result);

    // })

    this.searchService.getSearchResults(this.searchParam, {"filters": this.filters}).subscribe( {
      next: this.handleSearchResults.bind(this),
      error: this.handleError.bind(this)
    })
  }

  handleSearchResults(result: any): void {
    console.log("the result inside handle results: ");
    console.log(result);
    this.searchResults = result
  }

  handleError(error: any): void {
    console.log("the error inside handle error: " + error);

    console.log("inside handle error");

  }

  goToResult(type: string, id: string): void {
    this.navigationService.navigateByUrl(`${type}/${id}`)
  }

}
