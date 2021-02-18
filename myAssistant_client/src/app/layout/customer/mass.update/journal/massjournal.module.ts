import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';

import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MultiSelectModule } from 'primeng/multiselect';
import { DragDropModule } from 'primeng/dragdrop';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { PageHeaderModule } from '../../../../shared';
import {FullCalendarModule} from 'primeng/fullcalendar';


import { MassJournalRoutingModule } from './massjournal-routing.module';
// Toolkit component
import { MassJournalComponent} from './massjournal.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule, FullCalendarModule,
                MassJournalRoutingModule, DragDropModule,
               TooltipModule,CheckboxModule,ConfirmDialogModule,
               PanelModule, AutoCompleteModule,AccordionModule,TabViewModule,TreeTableModule,TreeModule,
               TableModule,DialogModule, MultiSelectModule, ButtonModule, DropdownModule, 
               MessagesModule, PageHeaderModule, CalendarModule, ToastModule ],
    declarations: [ MassJournalComponent],
    exports: [MassJournalComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MassJournalModule { }

