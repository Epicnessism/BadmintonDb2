import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoginBody } from '../../interfaces/login-body.model';
import { UserSignupBody } from '../../interfaces/user-signup-body.model';
// import { SubscriptionService } from './subscription.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Todo create environments for this so we dont have to switch this all the time and everywhere

  constructor(
    private http: HttpClient,
    private router: Router,
    // private subscriptionService: SubscriptionService
    ) { }

  authenticate(): Observable<any> { // todo add return type
    console.log(environment.backendURL + `auth/authenticate`);
    // return this.http.get<any>(environment.backendURL + `auth/authenticate`, {withCredentials: true});
    return this.http.get<any>(environment.backendURL + `auth/authenticate`);
  }

  login(body: LoginBody): Observable<any> { // todo add return type
    // return this.http.post<any>(environment.backendURL + `auth/login`, body,  {withCredentials: true});
    return this.http.post<any>(environment.backendURL + `auth/login`, body);
  }

  signOut() {
    // this.http.get<any>(environment.backendURL + `auth/logout`, {withCredentials: true}).subscribe( result => {
    this.http.get<any>(environment.backendURL + `auth/logout`).subscribe( result => {
      console.log(result);
      this.router.navigate(['']);
    })
  }

  signUp(body: UserSignupBody): Observable<any> { // todo add return type
    // return this.http.post<any>(environment.backendURL + `auth/register`, body, {withCredentials: true});
    return this.http.post<any>(environment.backendURL + `auth/signUp`, body);
  }

  routeTo(route: string) {
    console.log(route);
    // this.subscriptionService.sendLoginRedirect(route);
    this.authenticate().subscribe(result => {
      this.router.navigate([route])
    })
  }

  routeToAfterLogin(route: string, body: LoginBody) {
    console.log(route);
    console.log(body);
    this.login(body).subscribe( result => {
      this.router.navigate([route]);
    })
  }

}
