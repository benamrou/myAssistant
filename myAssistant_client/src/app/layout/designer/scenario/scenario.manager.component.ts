import { Component, OnInit, Input, Output, EventEmitter,ElementRef, Inject, HostListener, 
         ViewChild, OnDestroy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ChartModule, ICRChart } from '../../../shared/graph';

// Full screen
import { DOCUMENT } from '@angular/common';



import * as _ from 'lodash';

//mport json_data from '../../../../assets/survey.json';

import { MessageService, ConfirmationService } from  'primeng/api';
import { QueryService } from '../../../shared/services/index';
import { ScreenService, TemplateService } from '../../../shared/services/index';


@Component({
	moduleId: module.id,
    selector: 'scenario-manager',
    templateUrl: './scenario.manager.component.html',
    styleUrls: ['./scenario.manager.component.scss', '../../../app.component.scss'],
    providers: [MessageService, ChartModule,ScreenService, TemplateService, ConfirmationService, QueryService],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None
})

export class ScenarioManagerComponent implements OnInit, OnDestroy {
    
    //@Input() json: any;
    columns: any [] = [];

    screenID;
    screenInfo;
    elem: any; isFullScreen: boolean; document: any;


    chart: ICRChart;

    subscription: any [] = [];

    scenarios;
    backUpScenarios; // Original templates before changes

    selectedScenario;
    selectedIndice;
    selectedDetailScenario;

    statuses: any[];

    columnScenarios: any[];
    dataReady: boolean = false;
    rowSelected: boolean =false;

    keywordsTags: string[];
    profilesTags: string[];
    techsTags: string[];

    v_mode;
    v_modeEdit: number = 1;
    v_modeDisplay: number = 0;
    v_modeNEW: number = 0;

    jsonQuestion;

    // Step 1 - Get list of widgets allowed for the user
    // Step 2 - Execute the authorized widgets
    constructor(public _messageService: MessageService, private _queryService: QueryService, 
                private _templateService: TemplateService,
                @Inject(DOCUMENT) document,
                private _confirmationService: ConfirmationService, private _screenInfo: ScreenService) {
        this.screenID =  'SCRD000000001';
        this.chart = new ICRChart();

        this.v_mode = this.v_modeDisplay;
 
        this.columnScenarios = [
            { field: 'FCQINTID', header: 'Internal id', display: false, align: 'left' },
            { field: 'FCQID', header: 'ID', display: true, align: 'left' },
            { field: 'FCQNAME', header: 'Title', display: true, align: 'left' },
            { field: 'FCQDESC', header: 'Description', display: true, align: 'left' },
            { field: 'FCQQUESTION', header: 'Domain', display: false, align: 'left' },
            { field: 'FCQTAGS', header: 'Tags', display: false, align: 'left' },
            { field: 'FCQTAGSPROFIL', header: 'Profile tags', display: false, align: 'left' },
            { field: 'FCQTECH', header: 'Technical tags', display: false, align: 'left' },
            { field: 'FCQDURATION', header: 'Exec. duration (hours)', display: true, align: 'center' }
          ];

          this.document= document;
           

    }


    ngAfterViewInit(){
    }

    ngOnInit() {
        this.chkScreenMode();
        this.elem = document.documentElement;
        this.getScenarios();
    }


    getScenarios () {
        // Get the templates query FAC0000001
        this._queryService.getQueryResult('FAC0000002','-1').subscribe( 
            data => { this.scenarios = data; 
                    //Back Up data 
                    this.backUpScenarios = Object.assign([], this.scenarios);
            },
            error => {
                this._messageService.add({severity:'error', summary:'ERROR Message', detail: error });
            },
            () => {  // Get the scenarios details query FAC0000002 
                    this.dataReady = true; 
                    console.log('scenarios: ', this.scenarios);
                    console.log('Data set to ready');
                }
            );
    }

    openNew() {
        // creating shape
        this.v_modeNEW = 1;
        this.scenarios.push(
            {
                FCQINTID:'',
                FCQID: '',
                FCQTAGS:'',
                FCQTAGSPROFIL:'',
                FCQTECH:'',
                FCQDURATION:0
            }
        );
        this.keywordsTags = [];
        this.profilesTags = [];
        this.techsTags = [];
        this.selectedIndice = this.scenarios.length-1;

        this.selectedScenario = Object.assign({}, this.scenarios[this.selectedIndice]);
        this.keywordsTags = this.selectedScenario.FCQTAGS.split('#');
        this.keywordsTags.shift(); // Remove first # element
        this.profilesTags = this.selectedScenario.FCQTAGSPROFIL.split('#');
        this.techsTags = this.selectedScenario.FCQTECH.split('#');

        console.log('NEW', this.selectedIndice, this.scenarios, this.selectedScenario);
        this.v_mode = this.v_modeEdit;

    }

    editScenario(indice) {
        //this.templates = {...template};
        this.selectedScenario = Object.assign({}, this.scenarios[indice]);
        
        //console.log ('edit: ', indice, this.templates, this.selectedScenario);

        if (this.selectedScenario.FCQTAGS) {
            this.keywordsTags = this.selectedScenario.FCQTAGS.split('#');
            this.keywordsTags.shift(); // Remove first # element
        } else {this.selectedScenario.FCQTAGS = [] }
        if (this.selectedScenario.FCQTAGSPROFIL) {
            this.profilesTags = this.selectedScenario.FCQTAGSPROFIL.split('#');
            this.profilesTags.shift(); // Remove first # element
        } else {this.selectedScenario.FCQTAGSPROFIL = [] }
        if (this.selectedScenario.FCQTECH) {
            this.techsTags = this.selectedScenario.FCQTECH.split('#');
            this.techsTags.shift(); // Remove first # element
        } else {this.selectedScenario.FCQTECH = [] }

        this.selectedIndice = indice;
        this.v_mode = this.v_modeEdit;
    }

    deleteScenario(indice) {
        this._confirmationService.confirm({
            message: 'Are you sure you want to delete ' +  this.scenarios[indice].FCQID + + ' ?',
            header: 'Delete template',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.scenarios.splice(indice, 1);
                this._messageService.add({severity:'success', summary: 'Successful', detail: 'Scenario Deleted', life: 3000});
            }
        });
    }

    cancelEdit() {
        this._confirmationService.confirm({
            message: 'Are you sure you want to cancel template edition ?',
            header: 'Cancel changes',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log('Cancel ', this.selectedScenario, this.scenarios, this.selectedIndice)
                if (this.selectedScenario == undefined) {
                    // No internal FCQINTID - Remove last object for new scenarios
                     this.scenarios.splice(this.selectedIndice, 1);
                }
                else if (this.selectedScenario.FCQINTID == '' && this.v_modeNEW == 1 ) {
                    this.scenarios.splice(this.selectedIndice, 1);
                }
                this.v_modeNEW = 0;
                // Refresh keywords 
                this.selectedScenario = Object.assign({}, this.scenarios[this.selectedIndice]);
                this.keywordsTags = this.selectedScenario.FCQTAGS.split('#');
                this.keywordsTags.shift(); // Remove first # element
                this.profilesTags = this.selectedScenario.FCQTAGSPROFIL.split('#');
                this.techsTags = this.selectedScenario.FCQTECH.split('#');

                this.v_mode = this.v_modeDisplay;
            }
        });
    }

    closeEdit() {
        // Move data from selected Scenarios to Scenarios
        console.log ('close: ',this.selectedIndice,  this.scenarios, this.selectedScenario);
        this.scenarios[this.selectedIndice].FCQID = this.selectedScenario.FCQID;
        if (this.keywordsTags.length > 0) {
            this.scenarios[this.selectedIndice].FCQTAGS = '#' + this.keywordsTags.join('#');
        }
        else {

        }
        if (this.profilesTags.length > 0) {
            this.scenarios[this.selectedIndice].FCQTAGSPROFIL = '#' + this.profilesTags.join('#');
        }
        this.scenarios[this.selectedIndice].FCQDURATION = this.selectedScenario.FCQDURATION;
        this.v_modeNEW = 0;
        this.v_mode = this.v_modeDisplay;
    }
    
    saveChanges() {
        let result, changesMade;
        this.backUpScenarios.forEach(element => {
            changesMade = false;
             result = this.scenarios.find(item => item.FCQINTID ==element.FCQINTID);
             if(result && result.length > 0 && result.FCQID ==  element.FCQID && 
                result.FCQTAGS ==  element.FCQTAGS && result.FCQTECH ==  element.FCQTECH && 
                result.FCQQUESTION == element.FCQQUESTION &&
                result.FCQTAGSPROFIL ==  element.FCQTAGSPROFIL && result.FCQDURATION ==  element.FCQDURATION){
                changesMade = false;
            }
            else { changesMade = true; }
            if (changesMade) {
                // Make update
                let tags, tagsprofil, tagstech;
                if (result.FCQTAGS) {tags = result.FCQTAGS;}
                else { tags='' }
                if (result.FCQTAGSPROFIL) {tagsprofil = result.FCQTAGSPROFIL;}
                else { tagsprofil='' }
                if (result.FCQTECH) {tagstech = result.FCQTECH;}
                else { tagstech='' }

                console.log('save data:', result, this.scenarios, this.selectedScenario);
                this._templateService.postScenario(result.FCQINTID, result.FCQID, 
                    tags,tagsprofil, tagstech, 
                    result.FCQDURATION,result.FCQQUESTION).subscribe( 
                    data => { 
                        //console.log('save data:', data);
                    },
                    error => {
                        this._messageService.add({severity:'error', summary:'ERROR Message', detail: error });
                    },
                    () => {  // Get the scenarios details query FAC0000002 
                        //this._messageService.add({severity:'success', summary: 'Successful', detail: 'Scenario(s) saved', life: 3000});
                        }
                    );

            }
            this._messageService.add({severity:'success', summary: 'Successful', detail: 'Scenario(s) saved', life: 3000});

         });
    }

    saveSurvey(item) {
        this.selectedScenario.FCQQUESTION = item;
        let tags, tagsprofil, tagstech;
        if (this.selectedScenario.FCQTAGS) {tags = this.selectedScenario.FCQTAGS;}
        else { tags='' }
        if (this.selectedScenario.FCQTAGSPROFIL) {tagsprofil = this.selectedScenario.FCQTAGSPROFIL;}
        else { tagsprofil='' }
        if (this.selectedScenario.FCQTECH) {tagstech = this.selectedScenario.FCQTECH;}
        else { tagstech='' }

        this._templateService.postScenario(this.selectedScenario.FCQINTID, this.selectedScenario.FCQID, 
                                            tags,tagsprofil, tagstech, 
                                            this.selectedScenario.FCQDURATION,this.selectedScenario.FCQQUESTION).subscribe( 
            data => { 
                //console.log('save data:', data);
            },
            error => {
                this._messageService.add({severity:'error', summary:'ERROR Message', detail: error });
            },
            () => {  // Get the scenarios details query FAC0000002 
                //this._messageService.add({severity:'success', summary: 'Successful', detail: 'Scenario(s) saved', life: 3000});
                }
            );
        this._messageService.add({severity:'success', summary: 'Successful', detail: 'Scenario(s) saved', life: 3000});
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.scenarios);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "templates");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import("file-saver").then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

    ngOnDestroy() {
        for (let i =0; i < this.subscription.length; i ++) {
            this.subscription[i].unsubscribe();
        }
    }

    selectRow(indice) {
        console.log('selectRow: ', indice);
        this.selectedScenario=this.scenarios[indice];
        
        this.rowSelected = true;

        if (this.selectedScenario.FCQTAGS) {
            this.keywordsTags = this.selectedScenario.FCQTAGS.split('#');
            this.keywordsTags.shift(); // Remove first # element
        }
        if (this.selectedScenario.FCQTAGSPROFIL) {
            this.profilesTags = this.selectedScenario.FCQTAGSPROFIL.split('#');
            this.profilesTags.shift(); // Remove first # element
        }
        if (this.selectedScenario.FCQTECH) {
            this.techsTags = this.selectedScenario.FCQTECH.split('#');
            this.techsTags.shift(); // Remove first # element
        }
    }


    //@HostListener('document:fullscreenchange', ['$event']);
    //@HostListener('document:webkitfullscreenchange', ['$event']);
    //@HostListener('document:mozfullscreenchange', ['$event']);
    //@HostListener('document:MSFullscreenChange', ['$event']);

    fullscreenmodes(event){
        this.chkScreenMode();
    }

    chkScreenMode(){
        if(document.fullscreenElement){
            //fullscreen
            this.isFullScreen = true;
        }else{
            //not in full screen
            this.isFullScreen = false;
        }
    }
    
    openFullscreen() {

        console.log('openFullscreen - start isFullScreen: ', this.isFullScreen )
            // Trigger fullscreen
        const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
            mozRequestFullScreen(): Promise<void>;
            webkitRequestFullscreen(): Promise<void>;
            msRequestFullscreen(): Promise<void>;
        };
        
        if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
            docElmWithBrowsersFullScreenFunctions.requestFullscreen();
        } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
            docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
        } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
        } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
            docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
        }
        this.isFullScreen = true;

        console.log('openFullscreen - isFullScreen: ', this.isFullScreen )

    }
    /* Close fullscreen */
    closeFullscreen() {
        const docWithBrowsersExitFunctions = document as Document & {
            mozCancelFullScreen(): Promise<void>;
            webkitExitFullscreen(): Promise<void>;
            msExitFullscreen(): Promise<void>;
        };
        if (docWithBrowsersExitFunctions.exitFullscreen) {
            docWithBrowsersExitFunctions.exitFullscreen();
        } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
            docWithBrowsersExitFunctions.mozCancelFullScreen();
        } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            docWithBrowsersExitFunctions.webkitExitFullscreen();
        } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
            docWithBrowsersExitFunctions.msExitFullscreen();
        }
        this.isFullScreen = false;

        console.log('closeFullscreen - isFullScreen: ', this.isFullScreen )
    }
    
}