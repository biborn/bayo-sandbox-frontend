import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from './user.service';
import { API_URL } from './config.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    loggedIn = false;
    isAdmin = false;
    jwtHelper: JwtHelper = new JwtHelper();
    currentUser = { username: '', role: '' };

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private userService: UserService, private router: Router) {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = this.decodeUserFromToken(token);
            this.setCurrentUser(decodedUser);
        }
    }

    login(username, password) {
        const credentials = {
            username: username,
            password: password
        };
        return this.http.post(API_URL + 'login', credentials, this.options)
            .map(response => response.json()).map(response => {
                console.log('RESPONSE:', response);
                this.processAuth(response);
                return this.loggedIn;
        });
        //     .map((response) => {
        //     console.log('SECOND MAP:', response);
        // });
        // return this.userService.login(username, password).map(res => res.json()).map(
        //     res => {
        //         console.log('RESPONSE: ', res);
        //         localStorage.setItem('token', res.token);
        //         // localStorage.setItem('username', res.user);
        //         // this.authenticatedUser.next(res.user);
        //         // this.changeUser(res.user);
        //         const decodedUser = this.decodeUserFromToken(res.token);
        //         console.log('const decodedUser: ', decodedUser);
        //         this.setCurrentUser(decodedUser);
        //
        //
        //         console.log(
        //             this.jwtHelper.decodeToken(res.token),
        //             this.jwtHelper.getTokenExpirationDate(res.token),
        //             this.jwtHelper.isTokenExpired(res.token)
        //         );
        //
        //         return this.loggedIn;
        //     }
        // );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.loggedIn = false;
        this.isAdmin = false;
        this.currentUser = { username: '', role: '' };
        this.router.navigate(['/login']);
    }
    processAuth(auth_data) {
        // console.log('AUTH_DATA', JSON.stringify(auth_data));
        localStorage.setItem('token', auth_data.token);
        localStorage.setItem('username', auth_data.user);
        const decodedUser = this.decodeUserFromToken(auth_data.token);
        this.setCurrentUser(decodedUser);
    }

    decodeUserFromToken(token) {
        return this.jwtHelper.decodeToken(token).username;
    }

    setCurrentUser(decodedUser) {
        this.loggedIn = true;
        this.currentUser.username = decodedUser.username;
        this.currentUser.role = decodedUser.role;
        decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
        delete decodedUser.role;
        console.log('currentUser: ', this.currentUser);
    }

}
