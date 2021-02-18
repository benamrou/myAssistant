import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { PreMenuRoutingModule } from './premenu-routing.module';
import { PageHeaderModule } from '../shared';


import { PreMenuComponent } from './premenu.component';


import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule, 
               PreMenuRoutingModule,
               PanelModule, TooltipModule,
               BlockUIModule,FieldsetModule,
               TableModule,DialogModule, ButtonModule, 
               MessagesModule, PageHeaderModule, 
               CalendarModule, ToastModule ],
    declarations: [PreMenuComponent],
    exports: [PreMenuComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PreMenuModule { }
