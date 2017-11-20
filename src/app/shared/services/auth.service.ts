import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
    loggedIn = false;
    isAdmin = false;

    jwtHelper: JwtHelper = new JwtHelper();

    // currentUser = { _id: '', username: '', role: '' };
    currentUser;
    constructor(private userService: UserService,
                private router: Router) {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = this.decodeUserFromToken(token);
            this.setCurrentUser(decodedUser);
        }
    }

    login(username, password) {
        return this.userService.login(username, password).map(res => res.json()).map(
            res => {
                console.log('RESPONSE: ', res);
                localStorage.setItem('token', res.token);
                const decodedUser = this.decodeUserFromToken(res.token);
                console.log('const decodedUser: ', decodedUser);
                this.setCurrentUser(decodedUser);
                return this.loggedIn;
            }
        );
    }

    logout() {
        localStorage.removeItem('token');
        this.loggedIn = false;
        this.isAdmin = false;
        // this.currentUser = { _id: '', username: '', role: '' };
        this.router.navigate(['/']);
    }

    decodeUserFromToken(token) {
        return this.jwtHelper.decodeToken(token).username;
    }

    setCurrentUser(decodedUser) {
        this.loggedIn = true;
        // this.currentUser._id = decodedUser._id;
        // this.currentUser.username = decodedUser.username;
        // this.currentUser.role = decodedUser.role;
        // decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
        // delete decodedUser.role;
        this.currentUser = decodedUser;
        console.log('currentUser: ', this.currentUser);
    }

}
