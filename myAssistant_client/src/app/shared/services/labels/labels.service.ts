import {Injectable } from '@angular/core';
import {HttpService} from '../request/html.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import {UserService} from '../user/user.service';
import { map } from 'rxjs/operators';


export class Labels {
   public label: Label[] = [];
}
export class Label {
   public LABID; 
   public LABDESC;
   public LABLANG;
}

@Injectable()
export class LabelService {

  public labels : Labels;

  private baseLabelsUrl: string = '/api/labels/';
  
  private request: string;
  private params: HttpParams;

  constructor(private _http: HttpService,private _userService: UserService){ }

    /**
     * This function retrieves the Inbetween operation information.
     * @method getMovementsInBetween
     * @param counting date 
     * @param store
     * @returns JSON Detail Counting information object
     */
    getAllLabels() {
    this.request = this.baseLabelsUrl;
    let headersSearch = new HttpHeaders();
    this.params= new HttpParams();

    this.params = this.params.append('PARAM',localStorage.getItem('myAssistantUser'));
    headersSearch = headersSearch.set('QUERY_ID', 'LAB0000001');

    return this._http.get(this.request, this.params, headersSearch).map(response => {
              this.labels = new Labels();
              let data = <any> response;
              //console.log('Data labels : ' + JSON.stringify(data));
              if (data.length > 0) { Object.assign(this.labels.label , data); }
              //console.log ('Load finish labels - ' + JSON.stringify(this.labels));)
              return this.labels;
    });
  }


    getLabel(labelId) : string {
      let labelFound = this.labels.label.filter(x => x.LABID == labelId)[0];
      if (labelFound) { return labelFound.LABDESC; }
      else { return ''; }
    }

} 

