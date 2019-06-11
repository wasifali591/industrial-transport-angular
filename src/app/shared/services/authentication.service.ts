import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppSettings } from '../../../environments/environment';
import { RegisterData } from '../models/data';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<RegisterData>;
    public currentUser: Observable<RegisterData>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<RegisterData>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): RegisterData {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(AppSettings.Url + '/login', { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token ) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
