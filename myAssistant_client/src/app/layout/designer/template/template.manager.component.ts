import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ChartModule, ICRChart } from '../../../shared/graph';

import * as _ from 'lodash';

import { MessageService, ConfirmationService } from  'primeng/api';
import { QueryService } from '../../../shared/services/index';
import { ScreenService } from '../../../shared/services/index';

@Component({
	moduleId: module.id,
    selector: 'template-manager',
    templateUrl: './template.manager.component.html',
    styleUrls: ['./template.manager.component.scss', '../../../app.component.scss'],
    providers: [MessageService, ChartModule, ScreenService, ConfirmationService, QueryService],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None
})

export class TemplateManagerComponent implements OnInit, OnDestroy {

    columns: any [] = [];

    screenID;
    screenInfo;

    chart: ICRChart;

    subscription: any [] = [];

    templates;
    backUpTemplates; // Original templates before changes
    templateDetails;

    selectedTemplate;
    selectedIndice;
    selectedDetailTemplate;

    statuses: any[];

    columnTemplates: any[];
    dataReady: boolean = false;
    rowSelected: boolean =false;

    keywordsTags: string[];
    profilesTags: string[];

    v_mode;
    v_modeEdit: number = 1;
    v_modeDisplay: number = 0;
    v_modeNEW: number = 0;

    // Step 1 - Get list of widgets allowed for the user
    // Step 2 - Execute the authorized widgets
    constructor(public _messageService: MessageService, private _queryService: QueryService, 
                private _confirmationService: ConfirmationService, private _screenInfo: ScreenService) {
        this.screenID =  'SCRD000000001';
        this.chart = new ICRChart();

        this.v_mode = this.v_modeDisplay;

        // FACINTID, FACID, FACNAME, FACDESC FACTAGS 
        this.columnTemplates = [
            { field: 'FACINTID', header: 'Internal id', display: false, align: 'left' },
            { field: 'FACID', header: 'ID', display: true, align: 'left' },
            { field: 'FACNAME', header: 'Title', display: true, align: 'left' },
            { field: 'FACDESC', header: 'Description', display: true, align: 'left' },
            { field: 'FACTAGS', header: 'Tags', display: false, align: 'left' },
            { field: 'FACTAGSPROFIL', header: 'Profile tags', display: false, align: 'left' },
            { field: 'FACDURATION', header: 'Exec. duration (hours)', display: true, align: 'center' },
            { field: 'FACCNT', header: 'Nb. Questions', display: true, align: 'center' },
          ];
    }


    ngAfterViewInit(){
    }

    ngOnInit() {
        this.getTemplates();
    }

    getTemplates () {
        // Get the templates query FAC0000001
        this._queryService.getQueryResult('FAC0000001','-1')
        .subscribe( 
        data => { this.templates = data; 
                 //Back Up data 
                 this.backUpTemplates = Object.assign([], this.templates);
                  //console.log(JSON.stringify(this.templates));
        },
        error => {
            this._messageService.add({severity:'error', summary:'ERROR Message', detail: error });
        },
        () => {  // Get the templates details query FAC0000002
                this._queryService.getQueryResult('FAC0000002','-1')
                .subscribe( 
                    data => { this.templateDetails = data; 
                        console.log(JSON.stringify(this.templateDetails));
                    },
                    error => {
                        this._messageService.add({severity:'error', summary:'ERROR Message', detail: error });
                    },
                () => {  
                    this.dataReady = true;
                }
                );
        
        }
        );
    }

    openNew() {
        // creating shape
        this.v_modeNEW = 1;
        this.templates.push(
            {
                FACINTID:'',
                FACID: '',
                FACNAME:'',
                FACDESC:'',
                FACTAGS:'',
                FACTAGSPROFIL:'',
                FACDURATION:0
            }
        );
        this.keywordsTags = [];
        this.profilesTags = [];
        this.selectedIndice = this.templates.length-1;

        this.selectedTemplate = Object.assign({}, this.templates[this.selectedIndice]);
        this.keywordsTags = this.selectedTemplate.FACTAGS.split('#');
        this.keywordsTags.shift(); // Remove first # element
        this.profilesTags = this.selectedTemplate.FACTAGSPROFIL.split('#');

        console.log('NEW', this.selectedIndice, this.templates, this.selectedTemplate);
        this.v_mode = this.v_modeEdit;

    }

    editTemplate(indice) {
        //this.templates = {...template};
        this.selectedTemplate = Object.assign({}, this.templates[indice]);
        
        //console.log ('edit: ', indice, this.templates, this.selectedTemplate);
        this.keywordsTags = this.selectedTemplate.FACTAGS.split('#');
        this.keywordsTags.shift(); // Remove first # element
        this.profilesTags = this.selectedTemplate.FACTAGSPROFIL.split('#');
        this.profilesTags.shift(); // Remove first # element

        this.selectedIndice = indice;
        this.v_mode = this.v_modeEdit;
    }

    deleteTemplate(indice) {
        this._confirmationService.confirm({
            message: 'Are you sure you want to delete ' +  this.templates[indice].FACID + '-' + this.templates[indice].FACNAME + ' ?',
            header: 'Delete template',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.templates.splice(indice, 1);
                this._messageService.add({severity:'success', summary: 'Successful', detail: 'Template Deleted', life: 3000});
            }
        });
    }

    cancelEdit() {
        this._confirmationService.confirm({
            message: 'Are you sure you want to cancel template edition ?',
            header: 'Cancel changes',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log('Cancel ', this.selectedTemplate, this.templates, this.selectedIndice)
                if (this.selectedTemplate == undefined) {
                    // No internal FACINTID - Remove last object for new templates
                     this.templates.splice(this.selectedIndice, 1);
                }
                else if (this.selectedTemplate.FACINTID == '' && this.v_modeNEW == 1 ) {
                    this.templates.splice(this.selectedIndice, 1);
                }
                this.v_modeNEW = 0;
                // Refresh keywords 
                this.selectedTemplate = Object.assign({}, this.templates[this.selectedIndice]);
                this.keywordsTags = this.selectedTemplate.FACTAGS.split('#');
                this.keywordsTags.shift(); // Remove first # element
                this.profilesTags = this.selectedTemplate.FACTAGSPROFIL.split('#');

                this.v_mode = this.v_modeDisplay;
            }
        });
    }

    closeEdit() {
        // Move data from selected Templates to Templates
        console.log ('close: ',this.selectedIndice,  this.templates, this.selectedTemplate);
        this.templates[this.selectedIndice].FACID = this.selectedTemplate.FACID;
        this.templates[this.selectedIndice].FACNAME = this.selectedTemplate.FACNAME;
        this.templates[this.selectedIndice].FACDESC = this.selectedTemplate.FACDESC;
        if (this.keywordsTags.length > 0) {
            this.templates[this.selectedIndice].FACTAGS = '#' + this.keywordsTags.join('#');
        }
        else {

        }
        if (this.profilesTags.length > 0) {
            this.templates[this.selectedIndice].FACTAGSPROFIL = '#' + this.profilesTags.join('#');
        }
        this.templates[this.selectedIndice].FACDURATION = this.selectedTemplate.FACDURATION;
        this.v_modeNEW = 0;
        this.v_mode = this.v_modeDisplay;
    }
    
    saveChanges() {
        let result, changesMade;
        this.backUpTemplates.forEach(element => {
            changesMade = false;
             result = this.templates.find(item => item.FACINTID ==element.FACINTID);
             if(result && result.length > 0 && result.FACID ==  element.FACID || result.FACNAME ==  element.FACNAME || 
                result.FACDESC ==  element.FACDESC || result.FACTAGS ==  element.FACTAGS || 
                result.FACTAGSPROFIL ==  element.FACTAGSPROFIL || result.FACDURATION ==  element.FACDURATION){
                changesMade = false;
            }
            else { changesMade = true; }
            if (changesMade) {
                // Make update
                this._messageService.add({severity:'success', summary: 'Successful', detail: 'Template(s) saved', life: 3000});
            }
         });
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.templates);
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
        this.selectedTemplate=this.templates[indice];
        
        this.rowSelected = true;

        if (this.selectedTemplate.FACTAGS) {
            this.keywordsTags = this.selectedTemplate.FACTAGS.split('#');
            this.keywordsTags.shift(); // Remove first # element
        }
        if (this.selectedTemplate.FACTAGSPROFIL) {
            this.profilesTags = this.selectedTemplate.FACTAGSPROFIL.split('#');
            this.profilesTags.shift(); // Remove first # element
        }
    }
    
}