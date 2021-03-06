import {Injectable} from '@angular/core';
import {HttpService} from '../request/html.service';
import {UserService} from '../user/user.service';
import {DatePipe} from '@angular/common';

import { HttpParams, HttpHeaders } from '@angular/common/http';


/**
 * Template Service request and raw share data result for a given Query_ID.
 *    - Header must include parameter QUERY_ID
 */

  

@Injectable()
export class TemplateService {

  private baseQueryUrl: string = '/api/request/';
  private scenarioUpdateUrl: string = '/api/upload/1/';
  
  private request: string;
  private params: HttpParams;

  constructor(private http : HttpService,private _userService: UserService, private datePipe: DatePipe){ }


  /**
   * Get Dashboard data using Smart data extract with the dashboard Id
   * @param queryId 
   */
  getQueryResult(queryId: string, param?: string) {
    this.request = this.baseQueryUrl;
    let headersSearch = new HttpHeaders();
    let options = new HttpHeaders();
    this.params= new HttpParams();
    this.params = this.params.append('PARAM',param);
    this.params = this.params.append('PARAM',localStorage.getItem('myAssistantUser'));

    headersSearch = headersSearch.set('QUERY_ID', queryId);
    headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
    headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);
    return this.http.get(this.request, this.params, headersSearch).map(response => {
            let data = <any> response;
            return data;
    });
  }

  postScenario (internal_id, id, tags, tagsprofil, tagtech, duration, body) {
    //console.log('postFile',filename, startdate, trace, now, schedule_date, schedule_time, json )
    this.request = this.scenarioUpdateUrl;
    let headersSearch = new HttpHeaders();
    this.params= new HttpParams();
    this.params = this.params.append('PARAM',internal_id);
    this.params = this.params.append('PARAM',id);
    this.params = this.params.append('PARAM',tags);
    this.params = this.params.append('PARAM',tagsprofil);
    this.params = this.params.append('PARAM',tagtech);
    this.params = this.params.append('PARAM',duration);
    this.params = this.params.append('PARAM',localStorage.getItem('myAssistantUser'));

    headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
    headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);
    return this.http.post(this.request, this.params, headersSearch, body).map(response => {
            let data = <any> response;
            return data;
    });

   }
}
