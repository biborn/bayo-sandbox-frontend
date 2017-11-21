import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { API_URL } from './config.service';

@Injectable()
export class SettingsService {
    token = localStorage.getItem('token');
    private headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token,  'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) {}
    getUrls(username): Observable<any> {
        const request_body = {
            niaga_id: username
        };
        return this.http.post(API_URL + 'geturls', request_body, this.options).map(res => res.json());
    }

    saveUrls(callback_url, return_url): Observable<any> {
        const request_body = {
            callback_url: callback_url,
            return_url: return_url
        };

        return this.http.post(API_URL + 'saveurls', request_body, this.options).map(res => res.json());
    }

}
