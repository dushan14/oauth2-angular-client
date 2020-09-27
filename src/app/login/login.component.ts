import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenParams } from '../model/token-params';
import { AuthTokenService } from '../service/auth-token.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  OAUTH2_LINK_GOOGLE = 'http://localhost:8060/oauth2/authorize/google?redirect_uri=http://localhost:4200/'
  OAUTH2_LINK_FACEBOOK = 'http://localhost:8060/oauth2/authorize/facebook?redirect_uri=http://localhost:4200/'

  tokenParams: TokenParams = null;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authTokenService: AuthTokenService
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      userNameOrEmail: new FormControl(),
      password: new FormControl()
    });
  }

  onClickSubmitSignIn(formData) {
    this.authTokenService.clearTokenParams();
    console.log(formData);
    this.authenticationService.signIn(formData).subscribe(
      (result: TokenParams) => {
        console.log(result);
        const successfullyAdded = this.authTokenService.updateTokenParams(result);
        if (successfullyAdded) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  onGoogleSignIn() {
    window.location.href = this.OAUTH2_LINK_GOOGLE;
  }

  onFacebookSignIn() {
    window.location.href = this.OAUTH2_LINK_FACEBOOK;
  }

}
