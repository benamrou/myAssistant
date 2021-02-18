import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SurveyComponent } from './survey.page.component';

@NgModule({
    imports: [ RouterModule,HttpModule, CommonModule,FormsModule],
    declarations: [SurveyComponent],
    exports: [SurveyComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class OrderModule { }

