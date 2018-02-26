import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Models
import { RegisterModel } from '../models/register.model';
import { LoginModel } from '../models/login.model';

const appKey = 'kid_HyfK-Babf'; // APP KEY HERE;
const appSecret = 'd8535aa4159f4ca6b753a07d1558ecbe'; // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthenticationService {
    private currentAuthtoken: string;
    private currentRole: string;
    private username = new BehaviorSubject<any>({});  //username за topMenu-то
    public username$ = this.username.asObservable();

    constructor(
        private http: HttpClient
    ) { }

    login(loginModel: LoginModel) {
        return this.http.post(
            loginUrl,
            JSON.stringify(loginModel),
            {
                headers: this.createAuthHeaders('Basic')
            }
        );
    }

    register(registerModel: RegisterModel): Observable<Object> {
        return this.http.post(
            registerUrl,
            JSON.stringify(registerModel),
            {
                headers: this.createAuthHeaders('Basic')
            }
        );
    }

    logout() {
        return this.http.post(
            logoutUrl,
            {},
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        );
    }

    isLoggedIn() {
        // let authtoken: string = localStorage.getItem('authtoken');

        // return authtoken === this.currentAuthtoken;

        if (localStorage.getItem('authtoken')) {
            return true;
        }
        return false;
    }

    isAdminRole() {
        // let role: string = localStorage.getItem('role');
        // return role === this.currentRole;

        if (localStorage.getItem('role') === 'admin') {
            return true;
        }
        return false;
    }

    visualUsername(name) {
        this.username.next(name);
    }

    get authtoken() {
        return this.currentAuthtoken;
    }

    set authtoken(value: string) {
        this.currentAuthtoken = value;
    }

    get role() {
        return this.currentRole;
    }

    set role(value: string) {
        this.currentRole = value;
    }

    private createAuthHeaders(type: string): HttpHeaders {
        if (type === 'Basic') {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            });
        } else {
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            });
        }
    }
}
