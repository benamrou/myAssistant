import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import {Http, XHRBackend, RequestOptions, Request, BrowserXhr,BaseRequestOptions,
        RequestOptionsArgs, Response, Headers, ResponseOptionsArgs, ResponseType, ResponseContentType} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {Observable, ObservableInput, throwError} from 'rxjs';
import {catchError } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import {NotAccessibleComponent} from '../../../not-accessible/not-accessible.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService  {

  environment_mode: string;
  baseUrl: string = environment.serverURL;
  baseBatchUrl: string = environment.serverBatchURL;

  constructor(private httpClient: HttpClient, private _router: Router) {
    // super(backend,option);

    console.log('BASEURL : ' + this.baseUrl);
    console.log('BASE_BATCH_URL : ' + this.baseBatchUrl);
  }
  
  //constructor(mockbackend: MockBackend, backend: XHRBackend, option: BaseRequestOptions) {
  //  super(backend,option);
  //  console.log('BASEURL : ' + this.baseUrl);
  //}

 // constructor(backend: XHRBackend, browser: BrowserXhr, option: RequestOptions, responses?: ResponseOptionsArgs) {
 //   super(backend,option);
 //   console.log('BASEURL : ' + this.baseUrl);
//  }

  getMock(url: string, paramOtions?: HttpParams, headersOption?:HttpHeaders, responseType?): Observable<Response> {
    let token = localStorage.getItem('myAssistantAuthToken');
    let user = localStorage.getItem('myAssistantUser');
    //url = 'http://localhost:5555/' + url;
    console.log ('Get MOCK data : ' + url);
    if (!headersOption) {
      // let's make option object
      headersOption = new HttpHeaders();
    }
    headersOption.set('method','GET',);
    headersOption.set('Content-type', 'Application/json; charset=UTF-8');
    headersOption.set('USER', localStorage.getItem('myAssistantUser'));

    //console.log ('Request : ' + url);
    //console.log('headers '  + JSON.stringify(options.headers));
    //console.log('params '  + JSON.stringify(options.search));
    return this.httpClient.get(url, { headers: headersOption,
                                      params: paramOtions, 
                                      responseType: responseType? responseType: 'json'
                                    })
            .pipe(catchError((error: Response, caught) => {
            //console.log('Error : ' + JSON.stringify(error));
            if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
                console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
                window.location.href = window.location.href + '?' + new Date().getMilliseconds();
            }
            
            return Observable.throw(error);
        }) as any);
  }


  getLocalFile(url: string,  responseType): Observable<Response> {
    let token = localStorage.getItem('myAssistantAuthToken');
    let user = localStorage.getItem('myAssistantUser');
    //url = 'http://localhost:5555/' + url;
    console.log ('Get MOCK data : ' + url);

    //console.log ('Request : ' + url);
    //console.log('headers '  + JSON.stringify(options.headers));
    //console.log('params '  + JSON.stringify(options.search));
    return this.httpClient.get(url, { responseType: responseType})
            .pipe(catchError((error: Response, caught) => {
            //console.log('Error : ' + JSON.stringify(error));
            if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
                console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
                window.location.href = window.location.href + '?' + new Date().getMilliseconds();
            }
            
            return Observable.throw(error);
        }) as any);
  }

  get(url: string, paramOptions?: HttpParams, headersOption?:HttpHeaders): Observable<Response> {
    //console.log('***** Get HTML ****');

    let token = localStorage.getItem('myAssistantAuthToken');
    let user = localStorage.getItem('myAssistantUser');
    url = this.baseUrl + url;
    if (!headersOption) {
      // let's make option object
      headersOption = new HttpHeaders();
    }
    headersOption = headersOption.set('Content-Type', 'application/json');
    headersOption = headersOption.set('Content-type', 'Application/json; charset=UTF-8');
    headersOption = headersOption.set('USER', localStorage.getItem('myAssistantUser'));
    headersOption = headersOption.set('Authorization', localStorage.getItem('myAssistantAuthToken'));
    headersOption = headersOption.set('DATABASE_SID', localStorage.getItem('myAssistantSID'));
    headersOption = headersOption.set('LANGUAGE', localStorage.getItem('myAssistantLanguage'));

    console.log ('Request : ' + url + ' / ' + JSON.stringify(headersOption));
    //console.log('headers '  + JSON.stringify(headersOption));
    //console.log('params '  + JSON.stringify(paramOptions));
    return this.httpClient.get(url, { headers: headersOption,
                                      params: paramOptions,
                                      responseType: 'json'
                                    }
        ).pipe(catchError((error: Response, caught) => {
            console.log('Error : ' + JSON.stringify(error));
            if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
                console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
                window.location.href = window.location.href + '?' + new Date().getMilliseconds();
            }
            
            return this.handleError(url,error);
        }) as any);
  }
  

  getFile(url: string, paramOptions?: HttpParams, headersOption?:HttpHeaders): Observable<Response> {
    //console.log('***** Get HTML ****');

    let token = localStorage.getItem('myAssistantAuthToken');
    let user = localStorage.getItem('myAssistantUser');
    url = this.baseUrl + url;
    if (!headersOption) {
      // let's make option object
      headersOption = new HttpHeaders();
    }
    headersOption = headersOption.set('Content-Type', 'application/json');
    headersOption = headersOption.set('Content-type', 'Application/json; charset=UTF-8');
    headersOption = headersOption.set('Accept', 'application/octet-stream');
    headersOption = headersOption.set('USER', localStorage.getItem('myAssistantUser'));
    headersOption = headersOption.set('Authorization', localStorage.getItem('myAssistantAuthToken'));
    headersOption = headersOption.set('DATABASE_SID', localStorage.getItem('myAssistantSID'));
    headersOption = headersOption.set('LANGUAGE', localStorage.getItem('myAssistantLanguage'));

    console.log ('Request : ' + url + ' / ' + JSON.stringify(headersOption));
    //console.log('headers '  + JSON.stringify(headersOption));
    //console.log('params '  + JSON.stringify(paramOptions));
    return this.httpClient.get(url, { headers: headersOption,
                                      params: paramOptions,
                                      responseType: 'blob' as 'blob'
                                    }
        ).pipe(catchError((error: Response, caught) => {
            console.log('Error : ' + JSON.stringify(error));
            if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
                console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
                window.location.href = window.location.href + '?' + new Date().getMilliseconds();
            }
            
            return this.handleError(url,error);
        }) as any);
  }

  post(url: string,  paramOptions?: HttpParams, headersOption?:HttpHeaders, bodyOptions?: any ): Observable<Response> {
    //console.log('POST : URL => ' + JSON.stringify(url));
    let token = localStorage.getItem('myAssistantAuthToken');
    let user = localStorage.getItem('myAssistantUser');
    let body = {}
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      url = this.baseUrl + url;
    }
    if (!headersOption) {
      // let's make option object
      headersOption = new HttpHeaders();
    }
    headersOption = headersOption.set('Content-Type', 'application/json');
    headersOption = headersOption.set('USER', localStorage.getItem('myAssistantUser'));
    headersOption = headersOption.set('Authorization', localStorage.getItem('myAssistantAuthToken'));
    headersOption = headersOption.set('DATABASE_SID', localStorage.getItem('myAssistantSID'));
    headersOption = headersOption.set('LANGUAGE', localStorage.getItem('myAssistantLanguage'));

    if (bodyOptions) {
      body = bodyOptions;
    }
    console.log('Http post:', paramOptions, headersOption, body, bodyOptions);
    return this.httpClient.post(url, body, {  headers:headersOption,
                                              params: paramOptions, 
                                              responseType: 'json'
                                            }).pipe(catchError((error: Response, caught) => {
            if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
                console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
                window.location.href = window.location.href + '?' + new Date().getMilliseconds();
            }

            return this.handleError(url,error);
        }) as any);
  }

  postFile(url: string, formData): Observable<Response> {
    //console.log('POST : URL => ' + JSON.stringify(url));
    let token = localStorage.getItem('myAssistantAuthToken');
    let user = localStorage.getItem('myAssistantUser');
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      url = this.baseUrl + url;
    }
    let headersOption = new HttpHeaders();
    // File contains data the content-type must be multipart/form-data
    headersOption = headersOption.set('Content-Type', 'multipart/form-data');

    headersOption = headersOption.set('USER', localStorage.getItem('myAssistantUser'));
    headersOption = headersOption.set('Authorization', localStorage.getItem('myAssistantAuthToken'));
    headersOption = headersOption.set('DATABASE_SID', localStorage.getItem('myAssistantSID'));
    headersOption = headersOption.set('LANGUAGE', localStorage.getItem('myAssistantLanguage'));

    return this.httpClient.post(url, formData, {  headers:headersOption,
                                            responseType: 'json'
                                          }).pipe(catchError((error: Response, caught) => {
            if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
                console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
                window.location.href = window.location.href + '?' + new Date().getMilliseconds();
            }

            return this.handleError(url,error);
        }) as any);
  }

  execute(url: string, paramOptions?: HttpParams, headersOption?:HttpHeaders): Observable<Response> {
    //console.log('***** Get HTML ****');

    let token = localStorage.getItem('myAssistantAuthToken');
    let user = localStorage.getItem('myAssistantUser');
    url = this.baseBatchUrl + url;
    if (!headersOption) {
      // let's make option object
      headersOption = new HttpHeaders();
    }
    headersOption = headersOption.set('Content-Type', 'application/json');
    headersOption = headersOption.set('Content-type', 'Application/json; charset=UTF-8');
    headersOption = headersOption.set('USER', localStorage.getItem('myAssistantUser'));
    headersOption = headersOption.set('Authorization', localStorage.getItem('myAssistantAuthToken'));
    headersOption = headersOption.set('DATABASE_SID', localStorage.getItem('myAssistantSID'));
    headersOption = headersOption.set('LANGUAGE', localStorage.getItem('myAssistantLanguage'));
    headersOption = headersOption.set('ENV_IP', localStorage.getItem('ENV_IP'));
    headersOption = headersOption.set('ENV_ID', localStorage.getItem('ENV_ID'));
    headersOption = headersOption.set('ENV_PASS', localStorage.getItem('ENV_PASS'));


    console.log ('Request : ' + url + ' / ' + JSON.stringify(headersOption));
    //console.log('headers '  + JSON.stringify(headersOption));
    //console.log('params '  + JSON.stringify(paramOptions));
    return this.httpClient.get(url, { headers: headersOption,
                                      params: paramOptions,
                                      responseType: 'json'
                                    }
        ).pipe(catchError((error: Response, caught) => {
            //console.log('Error : ' + JSON.stringify(error));
            if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
                console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
                window.location.href = window.location.href + '?' + new Date().getMilliseconds();
            }
            
            return this.handleError(url,error);
        }) as any);
  }

  authentification(url: string, headersOption?:HttpHeaders, paramOtions?: HttpParams): Observable<Response> {
    //console.log('***** authentification ****');
    //console.log('Authentification - base URL : ' + JSON.stringify(this.baseUrl));
    let content = { body: "" };
    url = this.baseUrl + url;
    headersOption = headersOption.set('Content-Type', 'application/json');

    //console.log('Authentification - httpOptions : ' + JSON.stringify(this.httpOptions));
    return this.httpClient.post(url, content, {headers: headersOption}).pipe(catchError((error: Response, caught) => {
            return this.handleError(url,error);
        }) as any);
  }

  handleError(url: string, error: Response) : ObservableInput<Response> {
    console.error('Error error: ' + JSON.stringify(error));
    this._router.navigate(['not-accessible'], {
            queryParams: {
              message : JSON.stringify(error)
            }
          });
    return throwError(error);;
  }
}