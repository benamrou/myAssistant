import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './admin.dashboard-routing.module';
import { DashboardAdminComponent } from './admin.dashboard.component';
import { PageHeaderModule } from '../../../shared';
import { GridsterModule } from '../../../shared';
import { FormsModule } from '@angular/forms';
import { ChartModule } from '../../../shared/graph';

import { StatModule } from '../../../shared';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [
        CommonModule,
        DashboardAdminRoutingModule,
        StatModule,
        GridsterModule,
        BlockUIModule,
        MessagesModule,ToastModule,
        FormsModule,
        TableModule,PaginatorModule,
        ButtonModule,TooltipModule,DialogModule,
        PageHeaderModule,
        ChartModule
    ],
    declarations: [ DashboardAdminComponent ],
    exports: [ DashboardAdminComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardAdminModule {}
