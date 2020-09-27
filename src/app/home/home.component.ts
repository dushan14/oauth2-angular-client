import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseWrapper } from '../model/response-wrapper';
import { TokenParams } from '../model/token-params';
import { UserProfile } from '../model/user-profile';
import { AuthTokenService } from '../service/auth-token.service';
import { UserProfileService } from '../service/user-profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userProfile: UserProfile = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authTokenService: AuthTokenService,
    private userProfileService: UserProfileService,
  ) {
    this.processQueryParamsForToken();
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  processQueryParamsForToken() {
    this.activatedRoute.queryParams.subscribe((params: TokenParams) => {
      console.log(params);
      const successfullyAdded = this.authTokenService.updateTokenParams(params);
      if (successfullyAdded) {
        let url: string = this.router.url.substring(0, this.router.url.indexOf("?"));
        this.router.navigateByUrl(url);
      }
    });
  }

  loadUserProfile() {
    this.userProfileService.getUserProfile()
      .subscribe((result: ResponseWrapper<UserProfile>) => {
        console.log(this.userProfile);
        this.userProfile = ResponseWrapper.getFirstData(result);
      }
      );
  }

}
