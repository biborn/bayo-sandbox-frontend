import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionsService {
    token = localStorage.getItem('token');
    private headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token,  'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }
    getAllTransactions(username): Observable<any> {
        const request_body = {
            niaga_id: username
        };
        return this.http.post('http://localhost:3000/api/getalltransactions', request_body, this.options).map(res => res.json());
    }

}
