import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @Input() isLogin!: boolean
  @Output() isLoginChange = new EventEmitter<boolean>()

  signUpFormGroup: FormGroup = new FormGroup({
    username: new FormControl(undefined || '', [Validators.required]),
    password: new FormControl(undefined || '', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl(undefined || '', [Validators.required, Validators.minLength(4)]),
    givenName : new FormControl(undefined || '', [Validators.required]),
    familyName : new FormControl(undefined || '', [Validators.required]),
    email : new FormControl(undefined || '', [Validators.required, Validators.email]),
    birthday : new FormControl(undefined || '', [Validators.required]),
  })

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    console.log(this.signUpFormGroup.get('email'))
  }

  toggleIsLogin(): void {
    this.isLogin = !this.isLogin
    this.isLoginChange.emit(this.isLogin)

  }

  createAccount(): void {
    //check if pwd inputs are the same
    console.log(this.signUpFormGroup.value);
    if(this.signUpFormGroup.controls['password'].value == this.signUpFormGroup.controls['confirmPassword'].value) {
      this.authService.signUp(this.signUpFormGroup.value).subscribe(result => {
        console.log(result);
        console.log(localStorage);
        console.log("Inside Local Storage");
        localStorage.setItem('userId', result.userId)
        console.log(localStorage);

        this.navigationService.navigateByUrl('/profile');
      })
    } else {
      console.log(this.signUpFormGroup.controls['password'].value);
      console.log(this.signUpFormGroup.controls['confirmPassword'].value);
      console.log("lol mismatch pwds");

    }
  }

  //todo how the fuck do these work???????? is it all custom??
  getEmailErrorMessage() {
    let emailField = this.signUpFormGroup.get('email')
    if (emailField!.hasError('required')) {
      return 'You must enter a value';
    }

    return emailField!.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(passwordField: string) {
    let field = this.signUpFormGroup.get(passwordField)

    if(field!.hasError('required')) {
      return 'You must enter a value'
    } else if(field!.hasError('minlength')) {
      return 'password must have at least 4 characters'
    }
    return ''
  }

}
