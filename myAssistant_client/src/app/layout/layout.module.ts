import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarAdminComponent } from './menu/admin/sidebar/admin.sidebar.component';
import { HeaderAdminComponent } from './menu/admin/header/admin.header.component';
import { SidebarDesignerComponent } from './menu/designer/sidebar/designer.sidebar.component';
import { HeaderDesignerComponent } from './menu/designer/header/designer.header.component';
import { SidebarCustomerComponent } from './menu/customer/sidebar/customer.sidebar.component';
import { HeaderCustomerComponent } from './menu/customer/header/customer.header.component';

import {DropdownModule} from 'primeng/dropdown';
//import { HeaderComponent } from './components/header/header.component';

import {GridsterModule} from '../shared/';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';


import {SurveyCreateModule} from './survey';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        DropdownModule,
        GridsterModule,NgbDropdownModule,
        DialogModule,ButtonModule, SurveyCreateModule
    ],
    declarations: [LayoutComponent, 
                    SidebarAdminComponent, HeaderAdminComponent, 
                    SidebarDesignerComponent, HeaderDesignerComponent, 
                    SidebarCustomerComponent, HeaderCustomerComponent],
    providers: [ ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {}
