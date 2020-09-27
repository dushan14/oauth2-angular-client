import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseWrapper } from '../model/response-wrapper';
import { UserProfile } from '../model/user-profile';
import { AuthTokenService } from './auth-token.service';

@Injectable({
    providedIn: 'root',
})
export class UserProfileService {

    USER_URL = "http://localhost:8060/v1/user-profiles/me"

    constructor(
        private http: HttpClient,
        private authTokenService: AuthTokenService
    ) { }


    public getUserProfile(): Observable<ResponseWrapper<UserProfile>> {
        const token = this.authTokenService.getToken();
        return this.http.get<ResponseWrapper<UserProfile>>(this.USER_URL,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            }
        );
    }

}