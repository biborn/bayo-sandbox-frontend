import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;

    constructor(private auth: AuthService,
                public router: Router) {
    }

    ngOnInit() {
        if (this.auth.loggedIn) {
            this.router.navigate(['/dashboard']);
        }
    }

    login() {
        this.auth.login(this.username, this.password).subscribe(
            (res) => {
                console.log('RES:', res);
                this.router.navigate(['/dashboard']);
            }, (error) => {
                console.log('invalid email or password!', error);
            }
        );
    }

}
