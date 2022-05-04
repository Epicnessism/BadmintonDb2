import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchParam: string = '';
  subscribeSearch: Subscription = new Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
    ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe( params => {
      console.log(params);
      this.searchParam = params.get('searchParam') != null ? params.get('searchParam') as string : ''

    })
  }

  search(): void {
    //* do search to db here...
  }

}
