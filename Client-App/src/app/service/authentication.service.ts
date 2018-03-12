import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AppConfig } from '../config/app.config';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
// import { RequestOptions, Request, RequestMethod } from '@angular/http';

import { CurrentUser } from '../model/CurrentUser.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class AuthenticationService {
  private headers: HttpHeaders;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private storage: LocalStorageService,
    private router: Router) {

    if (this.storage.retrieve('uuid') !== null) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private handleError(error: any) {
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  logout() {
    // console.log(this.storage.retrieve('uuid'))
    // if (this.storage.retrieve('uuid') !== null) {
    //   let headers = new HttpHeaders({
    //     'Content-type': 'application/x-www-form-urlencoded',
    //     'Authorization': 'Bearer ' + this.storage.retrieve('uuid')
    //   });
    //   return this.http.post(AppConfig.endpoints.revoke_token, { headers: headers })
    //   .map(response => {
    this.loggedIn.next(false);
    this.storage.clear('uuid');
    //     return response;
    //   }).catch(error => this.handleError(error));

    // }
  }

  getUsers() {
    // add authorization header with jwt token
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.storage.retrieve('uuid') });
    return this.http.get('http://localhost:8080/user', { headers: headers })
  }

  login(currentUser: CurrentUser): Observable<CurrentUser> {
    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(AppConfig.security.client_id + ':' + AppConfig.security.client_secret)
    });
    let body = new HttpParams();
    body = body.append('grant_type', AppConfig.security.grant_type);
    body = body.append('username', currentUser.userName);
    body = body.append('password', currentUser.password);
    return this.http.post(AppConfig.endpoints.oauth_token, body, { headers: headers })
      .map(response => {
        this.loggedIn.next(true);
        this.storage.store('uuid', response['access_token']);
        return response;
      }).catch(error => this.handleError(error));
  }

}
