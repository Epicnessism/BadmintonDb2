import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, retry } from 'rxjs';
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
    return this.http.post<any>(apiURL, filters,  {withCredentials: true}).pipe(retry(1), catchError(this.errorHandler))  }

    errorHandler(httpErrorResponse: HttpErrorResponse) {
      console.log(httpErrorResponse); //TODO remove this after debugging and developing
      console.log(httpErrorResponse.error.message);

      return throwError( () => new Error(httpErrorResponse.message || "server error") )
    }
}
