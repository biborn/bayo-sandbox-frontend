import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SettingsService } from '../../shared/services/settings.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    animations: [routerTransition()]
})
export class SettingsComponent implements OnInit {
    urls = {
        callback_url: null,
        return_url: null
    };
    // username = localStorage.getItem('username');

    message: string;
    user;

    constructor(private settingsService: SettingsService, private authService: AuthService) {

    }
    ngOnInit() {
        const loggedInUser = localStorage.getItem('username');
        this.getUrls(loggedInUser);

    }

    getUrls(username) {
        this.settingsService.getUrls(username).subscribe((data) => {
            console.log('DATA:', data);
            this.urls = data.data;
            console.log('CALLBACK DATA?: ', this.urls.callback_url);
            console.log('RETURN DATA?: ', this.urls.return_url);
        });
    }

    saveUrls() {
        this.settingsService.saveUrls(this.urls.callback_url, this.urls.return_url).subscribe(response => {
            console.log('saveUrls(): ', response);
        });
    }
}
