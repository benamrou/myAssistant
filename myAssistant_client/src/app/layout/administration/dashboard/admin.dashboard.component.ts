import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ChartModule, ICRChart } from '../../../shared/graph';

import * as _ from 'lodash';

import { MessageService } from  'primeng/api';
import {  ScreenService } from '../../../shared/services/index';

@Component({
	moduleId: module.id,
    selector: 'admin-dashboard',
    templateUrl: './admin.dashboard.component.html',
    styleUrls: ['./admin.dashboard.component.scss', '../../../app.component.scss'],
    providers: [MessageService, ScreenService, ChartModule],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None
})

export class DashboardAdminComponent implements OnInit, OnDestroy {

    columns: any [] = [];

    screenID;
    screenInfo;

    chart: ICRChart;

    subscription: any [] = [];

    // Step 1 - Get list of widgets allowed for the user
    // Step 2 - Execute the authorized widgets
    constructor(public _messageService: MessageService, private _screenInfo: ScreenService) {
        
        this.screenID =  'SCRA000000001';
        this.chart = new ICRChart();
        // Step 1 - Get list of widgets allowed for the user
        try {

        }
        catch (error) { console.log('Widget loading error ' + error + JSON.stringify(error)); }
    }

    ngOnInit() {

    }

    ngAfterViewInit(){

    }


    ngOnDestroy() {
        for (let i =0; i < this.subscription.length; i ++) {
            this.subscription[i].unsubscribe();
        }
    }
}
