import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateManagerRoutingModule } from './template.manager-routing.module';
import { TemplateManagerComponent } from './template.manager.component';
import { PageHeaderModule } from '../../../shared';
import { GridsterModule } from '../../../shared';
import { FormsModule } from '@angular/forms';
import { ChartModule } from '../../../shared/graph';

import { StatModule } from '../../../shared';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipsModule } from 'primeng/chips';
import { InputNumberModule } from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';



import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
 
@NgModule({
    imports: [
        CommonModule,
        FileUploadModule,
        ConfirmDialogModule,PerfectScrollbarModule,
        InputNumberModule, InputTextModule, InputTextareaModule,
        CardModule,
        ChipsModule,
        TemplateManagerRoutingModule,
        ToolbarModule,
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
    declarations: [ TemplateManagerComponent ],
    exports: [ TemplateManagerComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TemplateManagerModule {}
