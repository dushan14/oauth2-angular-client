import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenParams } from '../model/token-params';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  SIGN_IN_URL = "http://localhost:8060/auth/sign-in"

  constructor(private http: HttpClient) { }

  public signIn(signInData): Observable<TokenParams> {
    const token = localStorage.getItem('token');
    return this.http.post<TokenParams>(this.SIGN_IN_URL,
      signInData
    );
  }
}
