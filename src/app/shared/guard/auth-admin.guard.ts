import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService} from '../services/auth.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        if (this.authService.isAdmin) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}
