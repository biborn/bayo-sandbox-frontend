import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SettingsService } from '../../shared/services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    animations: [routerTransition()]
})
export class SettingsComponent implements OnInit {
    callback_url: string;
    return_url: string;

    constructor(private settingsService: SettingsService) {
        this.settingsService.getUrls('terungshop').subscribe((data) => {
            console.log('DATA:', data);
            this.callback_url = data.callback_url;
            this.return_url = data.return_url;
        });
    }
    ngOnInit() {
        console.log('GOT CALLBACK DATA?: ', this.callback_url);
        console.log('GOT RETURN DATA?: ', this.return_url);
    }
}
