import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
// import { SubscriptionService } from 'src/app/services/subscription.service';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatchPasswordsValidator } from '../utils/match-passwords.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLogin: boolean = true;

  loginFormGroup: FormGroup;
  signUpFormGroup: FormGroup;

  subscription: Subscription;
  previousRoute: string = null;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    // private subscriptionService: SubscriptionService
  ) {
    // this.previousRoute = this.subscriptionService.getCurrentPreviousRoute();
    // this.subscription = this.subscriptionService.getLoginRedirect().subscribe( originalRoute => {
    //   console.log(originalRoute.route);
    //   this.previousRoute = originalRoute.route;
    // })
  }

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      username: [undefined || '', Validators.required],
      password: [undefined || '', Validators.required]
    });

    // this.signUpFormGroup = this._formBuilder.group({
    //   username: [undefined || '', Validators.required],
    //   password: [undefined || '', Validators.required],
    //   confirmPassword: [undefined || '', Validators.required],
    // });

    this.signUpFormGroup = new FormGroup({
      'username': new FormControl(undefined, Validators.required),
      'password': new FormControl(undefined, Validators.required),
      'confirmPassword': new FormControl(undefined, Validators.required),
    }, { validators: MatchPasswordsValidator})
  }

  login(): void {
    this.authService.login(this.loginFormGroup.value).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        // this.loginFormGroup.controls['username'].setValue('404 something returned failed')
        return throwError(err);
      }))
    .subscribe( result => {
      console.log(result);
      console.log("successful login");
      console.log(this.previousRoute);

      if(this.previousRoute != null) {
        this.router.navigate([this.previousRoute]);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  toggleIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

  signUp(): void {
    //check if pwd inputs are the same
    console.log(this.signUpFormGroup.value);
    if(this.signUpFormGroup.controls['password'].value == this.signUpFormGroup.controls['confirmPassword'].value) {
      this.authService.signUp(this.signUpFormGroup.value).subscribe(result => {
        console.log(result);
      })
    } else { //passwords do not match
      console.log(this.signUpFormGroup.controls['password'].value);
      console.log(this.signUpFormGroup.controls['confirmPassword'].value);
      console.log("lol");
    }
  }

  ngOnDestroy() {
    //unsubscribe so no mem leaks
    this.subscription.unsubscribe();
  }

}
