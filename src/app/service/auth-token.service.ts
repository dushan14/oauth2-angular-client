import { Injectable } from '@angular/core';
import { TokenParams } from '../model/token-params';

@Injectable({
    providedIn: 'root'
})
export class AuthTokenService {

    LOCAL_TOKEN_KEY = 'token';
    LOCAL_REFRESH_TOKEN_KEY = 'refreshToken';

    updateTokenParams(tokenParams: TokenParams): boolean {
        if (tokenParams.token) {
            localStorage.setItem(this.LOCAL_TOKEN_KEY, tokenParams.token);
            localStorage.setItem(this.LOCAL_REFRESH_TOKEN_KEY, tokenParams.refreshToken);
            return true;
        } else {
            return false;
        }
    }

    clearTokenParams() {
        localStorage.removeItem(this.LOCAL_TOKEN_KEY);
        localStorage.removeItem(this.LOCAL_REFRESH_TOKEN_KEY);
    }

    getToken() {
        return localStorage.getItem(this.LOCAL_TOKEN_KEY);
    }

    getRefreshToken() {
        return localStorage.getItem(this.LOCAL_REFRESH_TOKEN_KEY);
    }
}