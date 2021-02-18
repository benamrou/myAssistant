import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SurveyCreateComponent } from './survey.creator.component';

import {ScrollPanelModule} from 'primeng/scrollpanel';

@NgModule({
    imports: [ RouterModule,HttpModule, CommonModule,FormsModule, ScrollPanelModule ],
    declarations: [SurveyCreateComponent],
    exports: [SurveyCreateComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SurveyCreateModule { }

