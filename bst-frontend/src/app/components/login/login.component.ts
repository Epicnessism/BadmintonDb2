import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = true;

  loginFormGroup: FormGroup = new FormGroup({
    username: new FormControl(undefined || '', [Validators.required]),
    password: new FormControl(undefined || '', [Validators.required])
  })

  // subscription: Subscription;
  // previousRoute: string = null;
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    // private subscriptionService: SubscriptionService
  ) {
    //*
    // this.previousRoute = this.subscriptionService.getCurrentPreviousRoute();
    // this.subscription = this.subscriptionService.getLoginRedirect().subscribe( originalRoute => {
    //   console.log(originalRoute.route);
    //   this.previousRoute = originalRoute.route;
    // })
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginFormGroup.value).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        // this.loginFormGroup.controls['username'].setValue('404 something returned failed')
        return throwError(err); //TODO fix this
      }))
    .subscribe( result => {
      // console.log(result);
      console.log("successful login");
      localStorage.setItem('userId', result.userId)


      // console.log(this.previousRoute);

      //*
      // if(this.previousRoute != null) {
      //   this.router.navigate([this.previousRoute]);
      // } else {
      //   this.router.navigate(['/']);
      // }
      this.navigationService.navigateByUrl('/profile');
    });
  }

  toggleIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

}
