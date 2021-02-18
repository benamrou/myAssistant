import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ExportService, ImportService, LabelService } from '../shared/services';
import { MessageService } from 'primeng/api';
import {DatePipe} from '@angular/common';

import 'rxjs/add/operator/toPromise';


/**
 * In GOLD 5.10, there is no automation to generate the supplier planning automatically using the
 * service contract link. Users have to go in the screen and readjust the supplier planning
 * 
 * Symphony EYC has the license for GOLD source code and API. This solution is a workaround to generate
 * the service contract link and supplier planning within one operation.
 * 
 * Overall technical solution:
 *   1. Gather the actual service contract link information
 *   2. Send by interface (service contract link and Supplier schedule) the updated link
 *   3. Execute the integration batches.
 * 
 * @author Ahmed Benamrouche
 * 
 */

@Component({
	moduleId: module.id,
    selector: 'premenu',
    templateUrl: './premenu.component.html',
    providers: [ MessageService, ExportService, ImportService],
    styleUrls: ['./premenu.component.scss', '../app.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PreMenuComponent implements OnInit{

   datePipe: DatePipe;
   dateNow: Date;
   dateTomorrow: Date;

   screenID;
   text_id: any; 
   detailText_id: any; 
   displayId = 0;
   displayInfo = false;

   label_textDisplay_id: any = [];
   label_detailTextDisplay_id: any = [];
   label_back: any;



  constructor(public _router: Router, private _labelService: LabelService) {
    this.datePipe     = new DatePipe('en-US');
    this.dateNow = new Date();
    this.dateTomorrow =  new Date(this.dateNow.setDate(this.dateNow.getDate() + 1));
    this.text_id       =  ['PREMENU0000000001', 'PREMENU0000000003' , 'PREMENU0000000005', 'PREMENU0000000007']; 
    this.detailText_id =  ['PREMENU0000000002', 'PREMENU0000000004' , 'PREMENU0000000006', 'PREMENU0000000008']; 

  }


  ngOnInit() {
    // Gathered labels
    for (let i=0; i < this.text_id.length; i ++) {
      this.label_textDisplay_id.push(this._labelService.getLabel(this.text_id[i]));
    }

    for (let i=0; i < this.detailText_id.length; i ++) {
      this.label_detailTextDisplay_id.push(this._labelService.getLabel(this.detailText_id[i]));
    }
    this.label_back = this._labelService.getLabel('BACKLOGIN');
  }

  onBeforeUpload(event) {
  }

  navigate (url) {
    this._router.navigate([url]);
  }

  getTitle(id) {
    return this.label_textDisplay_id[id];
  }
  
  getDetail(id) {
    return this.label_detailTextDisplay_id[id];
  }
 
}