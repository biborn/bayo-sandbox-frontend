import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        TransactionsRoutingModule,
        PageHeaderModule
    ],
    declarations: [TransactionsComponent]
})
export class TransactionsModule { }
