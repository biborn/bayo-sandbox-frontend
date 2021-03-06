import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {API_URL} from './config.service';

@Injectable()
export class UserService {
    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    register(user): Observable<any> {
        return this.http.post('/api/user', JSON.stringify(user), this.options);
    }

    login(username, password): Observable<any> {
        let credentials = {
            username: username,
            password: password
        };
        return this.http.post(API_URL + 'login', credentials, this.options);
    }

    getUsers(): Observable<any> {
        return this.http.get('/api/users').map(res => res.json());
    }

    countUsers(): Observable<any> {
        return this.http.get('/api/users/count').map(res => res.json());
    }

    addUser(user): Observable<any> {
        return this.http.post('/api/user', JSON.stringify(user), this.options);
    }

    getUser(user): Observable<any> {
        return this.http.get(`/api/user/${user._id}`).map(res => res.json());
    }

    editUser(user): Observable<any> {
        return this.http.put(`/api/user/${user._id}`, JSON.stringify(user), this.options);
    }

    deleteUser(user): Observable<any> {
        return this.http.delete(`/api/user/${user._id}`, this.options);
    }

}
