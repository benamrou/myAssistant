import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { ItemHierarchyRoutingModule } from './item.hierarchy-routing.module';
import { PageHeaderModule } from '../../../../shared';

import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';

import { ItemHierarchyComponent } from './item.hierarchy.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule, 
              ItemHierarchyRoutingModule,
               PanelModule, AutoCompleteModule,
               ToggleButtonModule,TooltipModule,
               BlockUIModule,FieldsetModule,
               FileUploadModule,CheckboxModule,
               TableModule,DialogModule, MultiSelectModule, ButtonModule, 
               DropdownModule, 
               MessagesModule, PageHeaderModule, 
               CalendarModule, ToastModule ],
    declarations: [ItemHierarchyComponent],
    exports: [ItemHierarchyComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ItemHierarchyModule { }
