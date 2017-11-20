import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loginForm: any = {};
    username: string;
    password: string;

    constructor(private auth: AuthService,
                public router: Router) {
    }

    ngOnInit() {
        if (this.auth.loggedIn) {
            this.router.navigate(['/dashboard']);
        }
        // this.loginForm = {
        //     email: this.email,
        //     password: this.password
        // };
    }

    /*onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }*/

    login() {
        this.auth.login(this.username, this.password).subscribe(
            (res) => {
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(['/dashboard']);
            }, error => {
                console.log('invalid email or password!', error);
            }
        );
    }

}
