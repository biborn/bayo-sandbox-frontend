import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TransactionsService } from '../../shared/services/transactions.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss'],
    animations: [routerTransition()]
})
export class TransactionsComponent implements OnInit {
    table_data: any;

    constructor(private transactionsService: TransactionsService) {}

    ngOnInit() {
        const loggedInUser = localStorage.getItem('username');
        this.transactionsService.getAllTransactions(loggedInUser).subscribe((response) => {
            console.log('response:', response);
            if (response.success) {
                this.table_data = response.data;
                console.log('TABLE_DATA:', this.table_data);
            }
        });
    }
}
