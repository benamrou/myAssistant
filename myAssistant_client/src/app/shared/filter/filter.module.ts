import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterComponent } from './filter.component';


import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import {FullCalendarModule} from 'primeng/fullcalendar';

@NgModule({
    imports: [ RouterModule,HttpModule, CommonModule,FormsModule,
               TableModule,MultiSelectModule,
               ButtonModule, 
               MessagesModule, 
               TabViewModule, DialogModule, FullCalendarModule,
               TooltipModule, PanelModule, CalendarModule ],
    declarations: [FilterComponent],
    exports: [FilterComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FilterModule { }

