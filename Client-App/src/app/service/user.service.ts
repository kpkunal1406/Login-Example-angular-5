import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AppConfig } from '../config/app.config';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

import { CurrentUser } from '../model/CurrentUser.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class UserService {
    constructor(private http: HttpClient,
        private snackBar: MatSnackBar,
        private storage: LocalStorageService) {
    }

    private handleError(error: any) {
        if (error instanceof Response) {
            return Observable.throw(error.json()['error'] || 'backend server error');
        }
        return Observable.throw(error || 'backend server error');
    }

    getUsers() {
        // add authorization header with jwt token
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.storage.retrieve('uuid') });
        return this.http.get('http://localhost:8080/users', { headers: headers })
            .catch(error => this.handleError(error));
    }



}
