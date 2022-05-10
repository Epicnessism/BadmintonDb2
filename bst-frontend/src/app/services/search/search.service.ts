import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BASE_SEARCH } from 'src/app/routes.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  getSearchResults(searchCriteria: string, filters: any): Observable<any> {
    let apiURL = `${environment.backendURL}${BASE_SEARCH}${searchCriteria}`;
    console.log(searchCriteria);
    console.log(apiURL);
    console.log(filters);
    return this.http.post<any>(apiURL, filters,  {withCredentials: true}).pipe(catchError(this.errorHandler))  }

    errorHandler(error: HttpErrorResponse) {
      return throwError( () => new Error(error.message || "server error") )
    }
}
