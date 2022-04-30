import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  signUpFormGroup: FormGroup = new FormGroup({
    username: new FormControl(undefined || '', [Validators.required]),
    password: new FormControl(undefined || '', [Validators.required]),
    confirmPassword: new FormControl(undefined || '', [Validators.required])
  })

  // subscription: Subscription;
  // previousRoute: string = null;
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private router: Router,
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
        this.loginFormGroup.controls['username'].setValue('404 something returned failed')
        return throwError(err); //TODO fix this
      }))
    .subscribe( result => {
      console.log(result);
      console.log("successful login");
      // console.log(this.previousRoute);

      //*
      // if(this.previousRoute != null) {
      //   this.router.navigate([this.previousRoute]);
      // } else {
      //   this.router.navigate(['/']);
      // }
      this.navigationService.navigateByUrl('/bracketView');
    });
  }

  toggleIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

  createAccount(): void {
    //check if pwd inputs are the same
    console.log(this.signUpFormGroup.value);
    if(this.signUpFormGroup.controls['password'].value == this.signUpFormGroup.controls['confirmPassword'].value) {
      this.authService.signUp(this.signUpFormGroup.value).subscribe(result => {
        console.log(result);

      })
    } else {
      console.log(this.signUpFormGroup.controls['password'].value);
      console.log(this.signUpFormGroup.controls['confirmPassword'].value);
      console.log("lol");

    }
  }

  ngOnDestroy() {
    //unsubscribe so no mem leaks
    // this.subscription.unsubscribe(); //*
  }


}
